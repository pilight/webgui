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

Form.Main=function() {
}

Form.Main = Form.Main.extendsFrom(Form);

Form.Main.prototype.__parseTpl=function(sParent) {	
	this.setParent(sParent);
	$(sParent).html(Mustache.to_html(Meja.getTemplate('templates/forms/main.tpl')));
}

Form.Main.prototype.__parseElement=function() {
	var oThis = this;

	this.Toolbar = new Elements.Toolbar();
	this.Toolbar.create(this.getParent()+' .main .toolbar');
	this.Toolbar.setHeight('50px');

	this.Button = new Elements.Button();
	this.Button.attachEvent("onclick", function(event) {
		Meja.Require('js/forms/form1.js');
		Meja.OnLoaded=function() {
			var Form1 = new Form.Form1();
			Form1.create(oThis.getParent()+' .container');
		}
		Meja.Load();
	});

	this.Button.setText("Form 1");
	this.Toolbar.insert(this.Button);
	
	this.Button1 = new Elements.Button();
	this.Button1.attachEvent("onclick", function(event) {
		Meja.Require('js/forms/form2.js');
		Meja.OnLoaded=function() {
			var Form2 = new Form.Form2();
			Form2.create(oThis.getParent()+' .container');
		}
		Meja.Load();
	});

	this.Button1.setText("Form 2");
	this.Toolbar.insert(this.Button1);

	this.Button2 = new Elements.Button();
	this.Button2.attachEvent("onclick", function(event) {
    var newWindow = window.open();
    newWindow.document.write("<textarea style=\"width: 100%; height: 100%;\">"+tidy_html5(document.body.innerHTML)+"</textarea>");
	});

	this.Button2.setText("Print HTML");
	this.Toolbar.insert(this.Button2);
}

Form.Main.prototype.create=function(sParent) {
	this.__parseTpl(sParent);
	this.__parseElement();
}