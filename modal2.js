var mysql = require('mysql');
var crypto = require('crypto');
var FdfsClient = require('fdfs');

var fdfs = new FdfsClient({
    // tracker servers
    trackers: [
        {
            //host: '10.101.1.165',
			host: '172.16.36.1',//'123.59.144.47',
            port: 22122
        }
    ],
    timeout: 10000,
    //defaultExt: 'txt',
    charset: 'utf8'
});

var pool  = mysql.createPool({
	//host : '10.101.1.163',
	host : '123.59.144.47',
	user : 'root',
	//password : '123456',
	password: 'zl_2wsx!QAZ',
	connectionLimit: 500
//	acquireTimeout: 30000
});
var IMG_HOST = "http://123.59.144.47/";

function doSql(funcArgu, onFinish) {
	pool.getConnection(function(err, conn) {
		if(err) { 
			////console.log(err);
			onFinish(true);
			return;
		}
		//console.log("doSql: "+funcArgu.sql+ "   "+ JSON.stringify(funcArgu.params));
		conn.query(funcArgu.sql, funcArgu.params, function(err, results) {
			conn.release(); // always put connection back in pool after last query
			//////console.log(JSON.stringify(results));
			if(err) {
				////console.log(err);
				if(onFinish) {
					onFinish(true, results);
				}
				return;
			}
			if(onFinish) {
				onFinish(false, results);
			}
		});
	});
};
function decodeBase64Image(dataString) {
  //////console.log(dataString);
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (!matches || matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
};
var uploadImage = function uploadImage(funcArgu, onFinish){
	if(!funcArgu.base64) {
        onFinish('');
        return;
	}
	var pic = decodeBase64Image(funcArgu.base64);
	fdfs.upload(pic.data, {ext: 'jpg'}).then(function(fileId) {
		if(onFinish) {
			onFinish(fileId);
		}
	}).catch(function(err) {
		////console.log(err);
	});
};

var CallbackLooper = {
	clear: function(){
		for(var i in this.funcArgus) {
			this.funcArgus[i] = null;
		}
		this.funcArgus = null;
	},
	loop: function() {
		var _this = this;
		////console.log(_this.func.toString() + ' 	'+_this.i+'  '+_this.count);
		if(_this.i == _this.count) {
			if(_this.onFinish) {
				_this.onFinish();
			}
		}
		if(_this.i < _this.count) {
			var doings = _this.funcArgus[_this.i].doing;
			for(var i in doings) {
                doings[i](_this.funcArgus[_this.i], null, _this);
			}
			_this.func(_this.funcArgus[_this.i], function(){  //<--- eg. == before after callback
				if(_this.onOneFinish) {
					var args = new Array(arguments.length+1);
					args[0] = _this.funcArgus[_this.i];
					for(var i = 0; i < arguments.length; ++i) {
						args[i+1] = (arguments[i]);
					}
					_this.onOneFinish.apply(this, args);
				}

				_this.i ++;
				//console.log(' 	sql'+_this.i+'  '+_this.count);
				_this.loop();
			});
		}
	},
    expand: function(funcArgus) { // must be called in onOneFinish
		if(funcArgus && funcArgus.length > 0) {
            this.count += funcArgus.length;
            this.funcArgus = this.funcArgus.concat(funcArgus);
        }
    },
	getArgus: function () {
		return this.funcArgus;
    },
	create: function(count, func, funcArgus, onFinish, onOneFinish) {
		var obj = {
			func:func,
			count:count,
			i:0,
			onFinish:onFinish,
			onOneFinish:onOneFinish,
			loop:CallbackLooper.loop,
            expand:CallbackLooper.expand,
			funcArgus:funcArgus
		};
		return obj;
	}
};
var CallbacksLooper = {
	loop: function() {
		var _this = this;
		if(_this.i == _this.count) {
			if(_this.onFinish) {
				_this.onFinish();
			}
		}
		if(_this.i < _this.count) {
			_this.func[_this.i](_this.funcArgus[_this.i], function(){
				if(_this.onOneFinish) {
					var args = new Array(arguments.length+1);
					args[0] = _this.funcArgus[_this.i];
					for(var i = 1; i < arguments.length; ++i) {
						args[i+1] = (arguments[i]);
					}
					_this.onOneFinish.apply(this, args);
				}
				_this.i ++;
				_this.loop();
			});
		}
	},
	create: function(count, func, funcArgus, onFinish, onOneFinish) {
		var obj = {
			func:func,
			count:count,
			i:0,
			onFinish:onFinish,
			onOneFinish:onOneFinish,
			loop:CallbacksLooper.loop,
			funcArgus:funcArgus
		};
		return obj;
	}
};
var mapObj = {"\\t":"","\"[":"[", "]\"":"]", "\"{":"{", "}\"":"}", "\\\"":"\""};
var roger = {
	"shallow": function(obj) {
		if("object" == typeof obj) {
			var c = {};
			for(var tag in obj){
				//if("object" != typeof obj[tag] ) {
					c[tag] = obj[tag];
				//}
			}
			return c;
		}
		return null;
	},
	"format":function(json) {
		json["IMGHOST"] = IMG_HOST;
		//////console.log(json);
		return JSON.stringify(json).replace(/\"\[|\]\"|\"{|}\"|\\\"|\\t/g, function(matched){
			return mapObj[matched];
		});
	},
	"check":function (data) { // if base data type e.g. {a:'x',b:3}
		for (var key in data) {
			var d = data[key];
			if( "object" == typeof d && Array != d.constructor){
				return 2;
			}
		}
		return 1;
	},
	//data has array property with object instead of array.
	//data has array property with base type. data maybe have multi array property, must be handle by tag.
	"prepare2":function (superior, tag, modal, data, out) {
        var copy = {tag:tag, valid:false, superior: superior, modal: modal, data: data};
        out.push(copy);
        if(data && "object" == typeof data ) {
			for (var key in data) {
				var m = modal[key], d = data[key];
				if(m) {
					if ("object" == typeof d && Array != d.constructor) {
						roger.prepare2(copy, key, m, d, out);
					} else if (Array == d.constructor) {
						for(var i in d) {
							roger.prepare2(copy, key, m, d[i], out);
						}
					}
				}
			}
		}
	},
	"prepare1":function (superior, tag, modal, data, out) {
		var copy = {tag:tag, valid:false, superior: superior, modal: modal, data: data};
		out.push(copy);
		for (var key in modal) {
			var m = modal[key];
			if(m) {
				if ("object" == typeof m && Array != m.constructor) {
					roger.prepare1(copy, key, m, data, out);
				}
			}
		}
	},
	//all.data <-  receive req json data
	//eg.{UserID:1234,Pics:["",""]}
	//all.list
	"before":function(list, data, onFinish){
		var funcArgus = [];
		var funcs = [];
		for(var i in list) {
			var item = list[i];
			for(var j in item.modal) {
				if(roger.tagHandler[j] && roger.tagHandler[j].before){
					funcArgus.push({item:item, vector:list});
					funcs.push(roger.tagHandler[j].before);
				}
			}
		}
		var csl = CallbacksLooper.create(funcs.length, funcs, funcArgus, onFinish, null);
		csl.loop();
	},
	"process": function (list, onFinish) {
		var funcArgus = [];
		for(var i in list) {
			var item = list[i];
			if(item.valid) {
				var doings = [];
				for(var j in item.modal) {
					if(roger.tagHandler[j] && roger.tagHandler[j].doing){
                        doings.push(roger.tagHandler[j].doing);
					}
				}
				funcArgus.push({sql:item.sql, params:item.params, item:item, doing:doings});
			}
		}
		var cl = CallbackLooper.create(funcArgus.length, doSql, funcArgus, onFinish,
			function(funcArgu, err, results){
				if(!err) {
					funcArgu.item.output = results;
				}
			});
		cl.loop();
	},
    "after":function(list, data, onFinish) {
        //console.log('after in:');
        var funcArgus = [];
        var funcs = [];
        for(var i in list) {
            var item = list[i];
            for(var j in item.modal) {
                if(roger.tagHandler[j] && roger.tagHandler[j].after){
                    funcArgus.push({item:item, vector:list});
                    funcs.push(roger.tagHandler[j].after);
                }
            }
        }
        var csl = CallbacksLooper.create(funcs.length, funcs, funcArgus, onFinish, null);
        csl.loop();
    },
    "clear": function(obj) {
    },
    "complete":function(list) {
        var out = {};
        var tag = '';
        for(var i in list) {
            //console.log(list[i].tag);
            tag = list[i].tag;
            if ('root' != tag) {
            	if(out[tag]) {
            		if(Array != out[tag].constructor) {
                        var a = out[tag];
                        out[tag] = [a];
					}
					out[tag].push(list[i].output);
				}else{
                    out[tag] = list[i].output;
				}
            }
        }

        var r =  roger.format(out);
        roger.clear(list);
        roger.clear(out);
        return r;
    },
	//data <-  receive req json data
	//eg.{UserID:1234,Pics:["",""]}
	//copy <-  semi list
	//eg."Picture": {"sql": "UPDATE SET ?, ?;",	"params":["Pics", "UserID"], "files":"Pics"}
	"uploadImages":function(files, funcArgu, onOneFinish, onFinish){
		for(var i = 0 ; i < files.length; i ++) {
			funcArgus.push({base64:files[i], funcArgu:funcArgu});
		}
		var cl = CallbackLooper.create(funcArgus.length, uploadImage, null, funcArgus,
			onFinish,
			function(funcArgu, fileid){
				onOneFinish(funcArgu, fileid);
			});
		cl.loop();
	},
	"replace": function(row, findkey, replacement ){
		var finalParams = [];
		for (var i in row) {
			var tag = row[i];
			if(tag == findkey) {
				finalParams.push(replacement);
			}else {
				finalParams.push(row[i]);
			}
		}
		return finalParams;
	},
	//eg.{UserID:1234,Pics:["",""]}
	//all.list <-  semi list, extract from modal tree.
	"tagHandler" :{
// ---------------before SQL ||| multi before need implement callback1,callback2,callback3..., last one callback trigger finish callback
		"files": {
			before: function(funcArgu, onFinish){
				var tags = funcArgu.item.modal.files;
				var data = funcArgu.item.data;
				var params = funcArgu.item.params;
				var files = [];
				for(var i in tags) {
					var file = data[tags[i]];
					if( Array == file.constructor ){
						for(var j in file) {
							files.push(file[j]);
						}
					}else if('string' == typeof file){
						files.push(file);
					}
				}
				roger.uploadImages(files, function(){
					this.clear();
					onFinish();
				}, function(fa, fileid){//oneFinish
					var finalParams = [];
					for (var i in params) {
						var tag = params[i];
						var index = tags.indexOf(tag);
						if(index>-1) {
							finalParams.push(fileid);
						}else {
							finalParams.push(params[i]);
						}
					}
					funcArgu.item.params = finalParams;
					var copy = roger.shallow(funcArgu.item);
					funcArgu.vector.push(copy);
				});
			}
		},
		"params":{
			before :function(funcArgu, onFinish) {
				var params = funcArgu.item.modal.params;
				var data = funcArgu.item.data;
				var finalParams = [];
				for (var tag in params) {
					if(data[params[tag]]) {
						finalParams.push(data[params[tag]]);
					}else {
						finalParams.push(params[tag]);
					}
				}
				funcArgu.item.params = finalParams;
				onFinish();
			}
		},
		"sql": {
			before :function(funcArgu, onFinish) {
				var item = funcArgu.item;
				item.valid = true;
				item.sql = item.modal.sql;
				item.params = item.modal.params;
				onFinish();
			}
		},
// ---------------do SQL
        "findkey": {
			doing :function(funcArgu, onFinish, looper) {
				var output = funcArgu.item.superior.output;
				var findkey = funcArgu.item.modal.findkey;
				var data = funcArgu.item.data;
				var params = funcArgu.item.modal.params;
				 //superior output is object
				if(output && 'object' == typeof output && Array != output.constructor) {

					funcArgu.item.params = roger.replace(params, findkey, output[findkey]);

				}// superior output is 2d array
				else if(Array == output.constructor){
					var vector = [];
					for(var j in output) {

						funcArgu.item.params = roger.replace(params, findkey, output[j][findkey]);
						var copy = roger.shallow(funcArgu.item);
						funcArgu.vector.push(copy);
                        vector.push({sql:copy.sql, params:copy.params, item:copy, doing:null});
					}
                    looper.expand(vector);
				}
				//onFinish();
			}
		},
// ---------------after SQL ||| multi before need implement callback1,callback2,callback3..., last one callback trigger finish callback
		"orderby": {
            after :function(funcArgu, onFinish) {
                var output = funcArgu.item.output;
                var orderby = funcArgu.item.modal.orderby;
                var obj = {};
                var count = 0;
                for(var i in output) {
                    var row = output[i];
                    var r = row[orderby];
                    if(r && "object" != typeof r && Array != r.constructor) {
                        var o = obj[r];
                        if(!o) {
                            obj[r] = {__index: 0, __values: []};
                            o = obj[r];
                            count++;
                            o.__index = count;
                        }
                        o.__values.push(row);
                    }
                }
                obj['__count'+orderby] = count;
                funcArgu.item.output = obj;
                onFinish();
            }
        }
	}

}
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

exports.rogerSmartSql = function(modal, data, callback) {
	var out = [];
	if(roger.check(data) == 1) {
		roger.prepare1(null, 'root', modal, data, out);
	}else {
		roger.prepare2(null, 'root', modal, data, out);
	}
	roger.before(out, data, function(){
		//console.log('BEFORE:');
		roger.process(out, function(){
			//console.log('PROCESS:');
			roger.after(out, data, function(){
				//console.log('AFTER:');
				var results = roger.complete(out);
				callback(true, results);
			});
		});
	});
}