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

Elements.Switch=function() {
	this.sType = "switch";
	this.onLabel = 'On';
	this.offLabel = 'Off';
	this.checked = false;
}

Elements.Switch = Elements.Switch.extendsFrom(Elements);

Elements.Switch.prototype.setWidth=function(sWidth) {
	this.sWidth = sWidth;
	if(this.exists()) {
		$('#'+this.getId()).jqxSwitchButton({'width': sWidth});
	}
}

Elements.Switch.prototype.setHeight=function(sHeight) {
	this.sHeight = sHeight;
	if(this.exists()) {
		$('#'+this.getId()).jqxSwitchButton({'height': sHeight});
	}
}

Elements.Switch.prototype.onchange=function() {
	this.execEvent("onchange");
}

Elements.Switch.prototype.onchecked=function() {
	this.execEvent("onchecked");
}

Elements.Switch.prototype.onunchecked=function() {
	this.execEvent("onunchecked");
}

Elements.Switch.prototype.__parseTpl=function(sParent) {	
	this.setParent(sParent);
	$(sParent).html(Mustache.to_html(Meja.getTemplate('templates/elements/switch.tpl'), {'id':this.getId()}));
}

Elements.Switch.prototype.__parseElement=function() {
	var oThis = this;
	$(this.getParent()+' .'+this.getId()).jqxSwitchButton({
		'width': this.sWidth,
		'height': this.sHeight
	});
	$(this.getParent()+' .'+this.getId()).bind('change', function(event) {
		return oThis.onchange(event);
	});
	$(this.getParent()+' .'+this.getId()).attr("id", this.getId());
	$(this.getParent()+' .'+this.getId()).bind('checked', function(event) {
		return oThis.onchecked(event);
	});
	$(this.getParent()+' .'+this.getId()).bind('unchecked', function(event) {
		return oThis.onunchecked(event);
	});
}

Elements.Switch.prototype.create=function(sParent) {
	this.__parseTpl(sParent);
	this.__parseElement();
}