/* Part of the Riggr SPA framework <https://github.com/Fluidbyte/Riggr> and released under the MIT license. This notice must remain intact. */
!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.indexed=b()}(this,function(){function a(a){return{processCB:function(a,b){if(a&&"function"==typeof a){var c=b===!1?!0:!1;a(c,b)}else console.error("Improper callback")},parseQuery:function(a){var b=[];return Array.isArray(a)||(a=[a]),a.forEach(function(a){var c=Object.keys(a);if("object"==typeof a[c]){var d=Object.keys(a[c]);b.push({field:c[0],operand:d[0],value:a[c][d]})}else b.push({field:c[0],operand:"$eq",value:a[c]})}),b},checkType:function(a){return{}.toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase()},create:function(b){var c=this,d=window.indexedDB.open(a);d.onupgradeneeded=function(b){var c=b.target.result;c.createObjectStore(a,{keyPath:"_id",autoIncrement:!1})},d.onsuccess=function(a){a.target.result.close(),c.processCB(b,!0)},d.onerror=function(){c.processCB(b,!1)}},insert:function(b,c){var d=this,e=window.indexedDB.open(a);e.onsuccess=function(e){function f(){g<b.length?(b[g]._id=(new Date).getTime()+g,k.put(b[g]).onsuccess=f,g++):d.find(h,c)}var g,h,i=e.target.result,j=i.transaction([a],d.IDBTransactionModes.READ_WRITE),k=j.objectStore(a);if("array"===d.checkType(b))g=0,h={_id:{$gte:(new Date).getTime()}},f();else{b._id=(new Date).getTime();var l=k.put(b).onsuccess=function(a){d.find({_id:b._id},c),i.close()};l.onerror=function(a){d.processCB(c,!1)}}},e.onerror=function(){d.processCB(c,!1)}},traverse:function(b,c,d){var e=this,f=window.indexedDB.open(a);f.onsuccess=function(f){var g=f.target.result,h=g.transaction([a],e.IDBTransactionModes.READ_WRITE),i=h.objectStore(a),j=IDBKeyRange.lowerBound(0),k=i.openCursor(j),l=[];k.onsuccess=function(a){function d(a,b,c){switch(b){case"$gt":return a>c;case"$lt":return c>a;case"$gte":return a>=c;case"$lte":return c>=a;case"$ne":return a!=c;case"$eq":return a==c;case"$like":return new RegExp(c,"i").test(a)}}var f,g=a.target.result;if(g){if(b){var h=!0;if(b.forEach(function(a){h=h&&d(g.value[a.field],a.operand,a.value)}),h){if("object"===e.checkType(c)){for(f in c)g.value[f]=c[f];g.update(g.value)}"delete"===c&&g["delete"](g.value._id),l.push(g.value)}}else{if("object"===e.checkType(c)){for(f in c)g.value[f]=c[f];g.update(g.value)}"delete"===c&&g["delete"](g.value._id),l.push(g.value)}g["continue"]()}},h.oncomplete=function(a){e.processCB(d,l),g.close()},k.onerror=function(){e.processCB(d,!1)}},f.onerror=function(){e.processCB(d,!1)}},find:function(){var a,b=!1;1===arguments.length&&"function"==typeof arguments[0]?a=arguments[0]:(b=this.parseQuery(arguments[0]),a=arguments[1]),this.traverse(b,!1,a)},update:function(){var a,b,c=!1;2===arguments.length&&"function"==typeof arguments[1]?(a=arguments[0],b=arguments[1]):(c=this.parseQuery(arguments[0]),a=arguments[1],b=arguments[2]),this.traverse(c,a,b)},"delete":function(){var a,b=!1;1===arguments.length&&"function"==typeof arguments[0]?a=arguments[0]:(b=this.parseQuery(arguments[0]),a=arguments[1]),this.traverse(b,"delete",a)},drop:function(b){var c=this,d=window.indexedDB.deleteDatabase(a);d.onsuccess=function(a){c.processCB(b,!0),c.create()},d.onblocked=function(a){c.processCB(b,!1)},d.onerror=function(){c.processCB(b,!1)}},IDBTransactionModes:{READ_ONLY:"readonly",READ_WRITE:"readwrite",VERSION_CHANGE:"versionchange"}}}return window.indexedDB=window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB,a});