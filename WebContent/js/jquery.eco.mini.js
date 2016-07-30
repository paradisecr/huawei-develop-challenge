/**
 *eco  js  v1.0
 *author :Joff Zhang
 *date: 2014/12/26
 */
(function(window){
	
	$.fn.showinfo=function(kindInfo,infos){
		var showInfo =  new ShowInfo(this,kindInfo,infos.hide,infos.params);
		if(kindInfo == "confirm"){
			if(infos.hide){
				showInfo.hide();
			}else{
				showInfo.init();
				showInfo.show();
			}
		}
		if(kindInfo == "tooltip"){
			showInfo.init();
			showInfo.show();
			setTimeout((function(){showInfo.hide();}),3000);
		}
	};
	var ShowInfo = function(ele,kindInfo,shOrh,params){
		this.$element = ele;
		this.kind = kindInfo;
		this.hflag = shOrh;
		this.params = params;
	};
	ShowInfo.prototype={
		show:function(){
			this.$element.modal('show');
		},
		hide:function(){
			this.$element.modal('hide');
		},
		init : function(){
			if(this.hflag)return;
			height = this.params.height;
			if(height==null){
				height="55px";
			}
			this.$element.css("height",height);
			width = this.params.width;
			if(width==null){
				width="200px";
			}
			this.$element.css("width",width);
			info = this.params.info;
			if(info != null){
				this.$element.find(".control-group").text(info);
			}
			if(this.$element.find(".box-content")[0] == null){
				this.$element.find(".alert-error").attr("class","box-content");
			}
			if(this.kind=="tooltip"){
				this.$element.css("left","45%");
				this.$element.find(".control-group").css("text-align","center");
				this.$element.find(".modal-header").css("display","none");
				this.$element.find(".form-actions").css("display","none");
				this.$element.find(".box-content").attr("class","alert alert-error");
				this.$element.find(".alert-error").css("padding",0);
				this.$element.find(".alert-error").css("margin",0);
			}else{
				headerHide = this.params.showOrhide.header;
				if(headerHide==null)headerHide=false;
				this.$element.find(".modal-header").css("display","block");
				actionHide = this.params.showOrhide.actions;
				if(actionHide==null)actionHide=false;
				this.$element.find(".form-actions").css("display","block");
				click = this.params.click;
				if(click != null){
					this.$element.find(".btn-primary").click(click);
				}
				myinfoLabel = this.params.myinfoLabel;
				if(myinfoLabel != null){
					this.$element.find("#myinfoLabel").text(myinfoLabel);
				}
			}
		}
	}
})(window);
