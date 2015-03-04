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

function Elements() {
	this.sWidth = '100%';
	this.sHeight = '40px';
	this.sText;
	this.sId = String.fromCharCode(65 + Math.floor(Math.random() * 26))+Date.now();
	this.sParent;
	this.aEvents = new Array();
}

Elements = Elements.extendsFrom(Function);

Elements.prototype.getType=function() {
	return this.sType;
}

Elements.prototype.setText=function(sText) {
	this.sText = sText;
	if(this.exists()) {
		$('#'+this.getId()).text(sText);
	}
}

Elements.prototype.getText=function(sText) {
	return this.sText;
}

Elements.prototype.setId=function(sId) {	
	if(this.exists()) {
		tool.attr("id", sId);
	}
	this.sId = sId;
}

Elements.prototype.getId=function() {
	return this.sId;
}

Elements.prototype.getParent=function() {
	return this.sParent;
}

Elements.prototype.setParent=function(sParent) {
	this.sParent = sParent;
}

Elements.prototype.exists=function() {
	if($('#'+this.getId()).length > 0) {
		return true;
	} else {
		return false;
	}
}