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

Elements.Button=function() {
	this.sType = "button";
}

Elements.Button = Elements.Button.extendsFrom(Elements);

Elements.Button.prototype.onclick=function() {
	this.execEvent("onclick");
}

Elements.Button.prototype.__parseTpl=function(sParent) {	
	this.setParent(sParent);
	$(sParent).html(Mustache.to_html(Meja.getTemplate('templates/elements/button.tpl'), {'id':this.getId()}));
}

Elements.Button.prototype.__parseElement=function() {
	var oThis = this;
	$(this.getParent()+' .'+this.getId()).jqxButton();
	$(this.getParent()+' .'+this.getId()).attr("id", this.getId());
	$(this.getParent()+' .'+this.getId()).bind('click', function() {
		return oThis.onclick(event);
	});
}

Elements.Button.prototype.create=function(sParent) {
	this.__parseTpl(sParent);
	this.__parseElement();
}