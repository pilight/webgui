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

function Meja() {	
	this.aXmlHttp = new Array();
	this.aTemplates = new Array();
	this.aDependencies = new Array();
	this.sScript = null;
	this.aScripts = new Array();
	this.aLoadList = new Array();
	this.iNrLoaded = 0;
	this.sMainForm = null;
	this.aLoaded = new Array();
}
	
Meja.prototype.__createLoadList=function(aDependencies, x ,iDepth) {
	if(typeof x != 'number') {
		x = 0;
	}
	if(typeof iDepth != 'number') {
		iDepth = 0;
	}

	if(this.aDependencies[aDependencies[x]]) {
		this.__createLoadList(this.aDependencies[aDependencies[x]], 0 ,(iDepth+1));
	}
	if(x<aDependencies.length) {
		var bExists = false;
		for(var y=0;y<this.aLoadList.length;y++) {
			if(this.aLoadList[y] == aDependencies[x]) {
				bExists = true;
			}
		}
		if(!bExists) {
			this.aLoadList[this.aLoadList.length] = aDependencies[x];
		}
		this.__createLoadList(aDependencies,(x+1),iDepth);
	} else if(iDepth == 0) {
		this.aLoadList[this.aLoadList.length] = this.sScript;
		this.aLoadList = this.aLoadList.reverse();

		this.__load();
	}
}

Meja.prototype.__retrieve=function(sUrl, fFunction) {
	var iLength = this.aXmlHttp.length;
	if(window.XMLHttpRequest) {
		var bBool = true;
		this.aXmlHttp[iLength]=new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		var bBool = false;	
		this.aXmlHttp[iLength]=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(this.aXmlHttp[iLength]) {
		this.aXmlHttp[iLength].onreadystatechange=function() {
			fFunction(iLength);
		}
		this.aXmlHttp[iLength].overrideMimeType('text/plain');
		this.aXmlHttp[iLength].open("GET",sUrl,bBool);
		this.aXmlHttp[iLength].send(null);
		}	
	}
	
Meja.prototype.__getDepedencyList=function() {
	return this.aDependencies;
}
	
Meja.prototype.__setDepedencyList=function(aDependencies) {
	this.aDependencies = aDependencies;
}	
	
Meja.prototype.__retrieveDependencyList=function() {
	var oThis = this;
	var sPath = "dependencies";
	
	this.__retrieve(sPath, function(iLength) {
	if(typeof oThis.aXmlHttp[iLength] == 'object' && oThis.aXmlHttp[iLength].readyState == 4) {			
		if(oThis.aXmlHttp[iLength].status == 0 || oThis.aXmlHttp[iLength].status == 200 || oThis.aXmlHttp[iLength].status == 304) {
			var sContent = oThis.aXmlHttp[iLength].responseText;						
			var aContent = sContent.split("\n");
			for(var i=0;i<aContent.length;i++) {
				var iCharCode = aContent[i].substring(aContent[i].length-1,aContent[i].length).charCodeAt(0);
				if(iCharCode == 13) {
					aContent[i] = aContent[i].substring(0,aContent[i].length-1);
				}
				if(aContent[i].substring(0,1) == '-') {
					var sChild = aContent[i].substring(1,aContent[i].length);
					oThis.aDependencies[sName][oThis.aDependencies[sName].length] = sChild;
				} else if(aContent[i]) {
					sName = aContent[i];
					oThis.aDependencies[sName] = new Array();
				}
			}
		if(oThis.aDependencies[oThis.sScript])
			oThis.__createLoadList(oThis.aDependencies[oThis.sScript]);
		} else if(oThis.aXmlHttp[iLength].status == 2 || oThis.aXmlHttp[iLength].status == 404) {
		}
		oThis.aXmlHttp[iLength].onreadystatechange = new Function();
		oThis.aXmlHttp[iLength] = null;
		}
	});
}
	
Meja.prototype.__load=function(x) {
	var oThis = this;

	if(typeof x != 'number') {
		x=(this.aLoadList.length-1);
	}

	var sScript = this.aLoadList[x];

	if(!document.getElementById(sScript) && !(sScript in this.aTemplates)) {
		if(!(oLoader = document.getElementById("splash"))) {
			oLoader = document.createElement("div");
			oContent = document.createElement("div");
			oImage = document.createElement("div");
			oMessage = document.createElement("div");
			oFile = document.createElement("div");

			oLoader.id = "splash";
			oContent.className = "content";
			oImage.className = "image";
			oMessage.className = "message";
			oFile.className = "file";

			oLoader.appendChild(oContent);
			oContent.appendChild(oImage);
			oContent.appendChild(oMessage);
			oContent.appendChild(oFile);
			document.body.appendChild(oLoader);
		}
		document.getElementById("splash").childNodes[0].childNodes[2].innerHTML = this.aLoadList[x];

		this.__retrieve(sScript, function(iLength) {
			if(typeof oThis.aXmlHttp[iLength] == 'object' && oThis.aXmlHttp[iLength].readyState == 4) {			
				if(oThis.aXmlHttp[iLength].status == 0 || oThis.aXmlHttp[iLength].status == 200 || oThis.aXmlHttp[iLength].status == 304) {
					var sExt = sScript.split('.').pop();
					if(sExt == 'js') {
						var sContent = oThis.aXmlHttp[iLength].responseText;
						var oNewScript = document.createElement('script');
						oNewScript.text = sContent;
						oNewScript.id = sScript;
						document.getElementsByTagName('head')[0].appendChild(oNewScript);
						oNewScript = null;
					} else if(sExt == 'tpl') {
						oThis.aTemplates[sScript] = oThis.aXmlHttp[iLength].responseText;
					} else if(sExt == 'css') {
						var head = document.head || document.getElementsByTagName('head')[0];
						var style = document.createElement('style');

						style.type = 'text/css';
						if (style.styleSheet){
							style.styleSheet.cssText = oThis.aXmlHttp[iLength].responseText;
						} else {
							style.appendChild(document.createTextNode(oThis.aXmlHttp[iLength].responseText));
						}

						head.appendChild(style);
					}

					if(x > 0) {
						window.setTimeout(function() {
							oThis.__load((x-=1));
						}, 1);
					} else {
						oThis.Loaded();
					}
				} else if(oThis.aXmlHttp[iLength].status == 2 || oThis.aXmlHttp[iLength].status == 404) {
				}
				oThis.aXmlHttp[iLength].onreadystatechange = new Function();
				oThis.aXmlHttp[iLength] = null;	
			}				
		});	
	} else if(x > 0) {
		this.__load((x-=1));
	} else {
		this.Loaded();
	}
}

Meja.prototype.getTemplate=function(sPath) {
	return this.aTemplates[sPath];
}

Meja.prototype.Loaded=function() {
	this.iNrLoaded++;
	if(this.iNrLoaded == this.aScripts.length) {
		try {
			this.iNrLoaded = 0;
			this.aScripts = new Array();
			this.OnLoaded();
			if(document.getElementById("splash")) {
				document.body.removeChild(document.getElementById("splash"));
			}
		} catch(e) {
			alert('include error: '+e.message);
		}
	} else {
		this.Load(this.iNrLoaded);
	}
}
		
Meja.prototype.Require=function(sScript) {
	this.aScripts[this.aScripts.length] = sScript;
}
	
Meja.prototype.Load=function(x) {
	if(!x) {
		x=0;
	}
	if(this.aScripts.length > 0) {
		var sScript = this.aScripts[x];
		this.sScript = sScript;
		var bLoad = true;

		for(var i in this.aDependencies) {
			bLoad = false;
			break;
		}					
		if(bLoad)	{
			this.__retrieveDependencyList();
		} else {
			this.aLoadList = new Array();
			if(this.aDependencies[sScript]) {
				this.__createLoadList(this.aDependencies[sScript]);
			} else {
				this.Loaded();
			}
		}
	}
}
	
var Meja = new Meja();