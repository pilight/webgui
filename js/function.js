/*
	Copyright (C) 2015 CurlyMo

	This file is part of pilight.

	pilight is free software: you can redistribute it and/or modify it under the
	terms of the GNU General Public License as published by the Free Software
	Foundation, either version 3 of the License, or (at your option) any later
	version.

	pilight is distributed in the hope that it will be useful, but WITHOUT ANY
	WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
	A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with pilight. If not, see	<http://www.gnu.org/licenses/>
*/

var oOldFunction = Function;

Function.prototype.extendsAttributes=function(Super) {
	var Self = this;
	var Func = function() {
		Super.apply(this, arguments);
		Self.apply(this, arguments);
	};
		
	Func.prototype = new Super();
	return Func;
}
	
Function.prototype.extendsFrom=function() {	
	var protos = new Array(arguments.length);

	for(var i=0;i<arguments.length;i++) {	
		protos[i] = arguments[i];
	}

	var self = this;

	for(var i in protos) {
		self = this.extendsAttributes(protos[i]);	
	}
		
	for(var i in protos) {	
		for(var x in protos[i].prototype) {
			if((typeof this[x] == 'function' && typeof protos[i].prototype[x] == 'function' && protos[i].prototype[x] == this[x]) || typeof this[x] != 'function') {
				self.prototype[x] = protos[i].prototype[x];
			}
		}
	}
	return self;
}
	
Function.prototype.attachEvent=function(sEvent, sFunction, bForceAdd) {
	if(typeof this.aEvents != 'object')
		this.aEvents = new Array();
	if(!this.aEvents[sEvent])
		this.aEvents[sEvent] = new Array();	
	var bExists = false;

	for(var i=0;i<this.aEvents[sEvent].length;i++) {
		if(typeof this.aEvents[sEvent][i] == 'function') {
			if(this.aEvents[sEvent][i].toString() == sFunction.toString()) {
				bExists = true;
			}
		}
	}
	if(!bForceAdd) {
		bForceAdd = false;
	}
	if(!bExists || bForceAdd) {
		this.aEvents[sEvent][this.aEvents[sEvent].length] = sFunction;	
	}
}
	
Function.prototype.detachEvent=function(sEvent,sFunction) {
	if(typeof this.aEvents == 'object') {
		if(this.aEvents[sEvent]) {
			var bExists = false;
			for(var i in this.aEvents[sEvent]) {
				if(this.aEvents[sEvent][i].toString() == sFunction.toString())
					delete this.aEvents[sEvent][i];
			}
		}
	}	
}
	
Function.prototype.execEvent=function(sEvent) {
	bReturn = true;
	sArg = '';
	
	for(var i=1;i<arguments.length;i++) {
		sArg += '\''+arguments[i]+'\',';
	}
	sArg = sArg.substring(0,(sArg.length-1));

	if(typeof this.aEvents == 'object') {		
		if(this.aEvents[sEvent]) {
			for(var i in this.aEvents[sEvent]) {
				eval('bReturn = this.aEvents[\''+sEvent+'\']['+i+']('+sArg+')');
			}
		}	
	}
	return bReturn;
}
	
Function.prototype.clearAllEvents=function() {
	delete this.aEvents;
}	
	
//if(is_khtml && is_mac)
//	Function.prototype.attachEvent1=Function.prototype.attachEvent;