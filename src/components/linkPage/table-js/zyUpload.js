function zyupload(){

	var ZYFILE = {
		fileInput : null,             // 选择文件按钮dom对象
		uploadInput : null,           // 上传文件按钮dom对象
		dragDrop: null,				  //拖拽敏感区域
		url : "",  					  // 上传action路径
		uploadFile : [],  			  // 需要上传的文件数组
		lastUploadFile : [],          // 上一次选择的文件数组，方便继续上传使用
		perUploadFile : [],           // 存放永久的文件数组，方便删除使用
		fileNum : 0,                  // 代表文件总个数，因为涉及到继续添加，所以下一次添加需要在它的基础上添加索引
		/* 提供给外部的接口 */
		filterFile : function(files){ // 提供给外部的过滤文件格式等的接口，外部需要把过滤后的文件返回
			return files;
		},
		onSelect : function(selectFile, files){      // 提供给外部获取选中的文件，供外部实现预览等功能  selectFile:当前选中的文件  allFiles:还没上传的全部文件
			
		},
		onDelete : function(file, files){            // 提供给外部获取删除的单个文件，供外部实现删除效果  file:当前删除的文件  files:删除之后的文件
			
		},
		onProgress : function(file, loaded, total){  // 提供给外部获取单个文件的上传进度，供外部实现上传进度效果
			
		},
		onSuccess : function(file, responseInfo){    // 提供给外部获取单个文件上传成功，供外部实现成功效果
			
		},
		onFailure : function(file, responseInfo){    // 提供给外部获取单个文件上传失败，供外部实现失败效果
		
		},
		onComplete : function(responseInfo){         // 提供给外部获取全部文件上传完成，供外部实现完成效果
			
		},
		
		/* 内部实现功能方法 */
		// 获得选中的文件
		//文件拖放
		funDragHover: function(e) {
			e.stopPropagation();
			e.preventDefault();
			this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
			return this;
		},
		// 获取文件
		funGetFiles : function(e){  
			var self = this;
			// 取消鼠标经过样式
			this.funDragHover(e);
			// 从事件中获取选中的所有文件
			var files = e.target.files || e.dataTransfer.files;
			self.lastUploadFile = this.uploadFile;
			this.uploadFile = this.uploadFile.concat(this.filterFile(files));
			var tmpFiles = [];
			
			// 因为jquery的inArray方法无法对object数组进行判断是否存在于，所以只能提取名称进行判断
			var lArr = [];  // 之前文件的名称数组
			var uArr = [];  // 现在文件的名称数组
			$.each(self.lastUploadFile, function(k, v){
				lArr.push(v.name);
			});
			$.each(self.uploadFile, function(k, v){
				uArr.push(v.name);
			});
			
			$.each(uArr, function(k, v){
				// 获得当前选择的每一个文件   判断当前这一个文件是否存在于之前的文件当中
				if($.inArray(v, lArr) < 0){  // 不存在
					tmpFiles.push(self.uploadFile[k]);
				}
			});
			
			// 如果tmpFiles进行过过滤上一次选择的文件的操作，需要把过滤后的文件赋值
			//if(tmpFiles.length!=0){
				this.uploadFile = tmpFiles;
			//}
			
			// 调用对文件处理的方法
			this.funDealtFiles();
			
			return true;
		},
		// 处理过滤后的文件，给每个文件设置下标
		funDealtFiles : function(){
			var self = this;
			// 目前是遍历所有的文件，给每个文件增加唯一索引值
			$.each(this.uploadFile, function(k, v){
				// 因为涉及到继续添加，所以下一次添加需要在总个数的基础上添加
				v.index = self.fileNum;
				// 添加一个之后自增
				self.fileNum++;
			});
			// 先把当前选中的文件保存备份
			var selectFile = this.uploadFile;  
			// 要把全部的文件都保存下来，因为删除所使用的下标是全局的变量
			this.perUploadFile = this.perUploadFile.concat(this.uploadFile);
			// 合并下上传的文件
			this.uploadFile = this.lastUploadFile.concat(this.uploadFile);
			
			// 执行选择回调
			this.onSelect(selectFile, this.uploadFile);
			console.info("继续选择");
			console.info(this.uploadFile);
			return this;
		},
		// 处理需要删除的文件  isCb代表是否回调onDelete方法  
		// 因为上传完成并不希望在页面上删除div，但是单独点击删除的时候需要删除div   所以用isCb做判断
		funDeleteFile : function(delFileIndex, isCb){
			var self = this;  // 在each中this指向没个v  所以先将this保留
			
			var tmpFile = [];  // 用来替换的文件数组
			// 合并下上传的文件
			var delFile = this.perUploadFile[delFileIndex];
			console.info(delFile);
			// 目前是遍历所有的文件，对比每个文件  删除
			$.each(this.uploadFile, function(k, v){
				if(delFile != v){
					// 如果不是删除的那个文件 就放到临时数组中
					tmpFile.push(v);
				}else{
					
				}
			});
			this.uploadFile = tmpFile;
			if(isCb){  // 执行回调
				// 回调删除方法，供外部进行删除效果的实现
				self.onDelete(delFile, this.uploadFile);
			}
			
			console.info("还剩这些文件没有上传:");
			console.info(this.uploadFile);
			return true;
		},
		// 上传多个文件
		funUploadFiles : function(){
			var self = this;  // 在each中this指向没个v  所以先将this保留
			// 遍历所有文件  ，在调用单个文件上传的方法
			$.each(this.uploadFile, function(k, v){
				self.funUploadFile(v);
			});
		},
		// 上传单个个文件
		funUploadFile : function(file){
			var self = this;  // 在each中this指向没个v  所以先将this保留
			
			var formdata = new FormData();
			formdata.append("fileList", file);	         		
			var xhr = new XMLHttpRequest();
			// 绑定上传事件
			// 进度
		    xhr.upload.addEventListener("progress",	 function(e){
		    	// 回调到外部
		    	self.onProgress(file, e.loaded, e.total);
		    }, false); 
		    // 完成
		    xhr.addEventListener("load", function(e){
	    		// 从文件中删除上传成功的文件  false是不执行onDelete回调方法
		    	self.funDeleteFile(file.index, false);
		    	// 回调到外部
		    	self.onSuccess(file, xhr.responseText);
		    	if(self.uploadFile.length==0){
		    		// 回调全部完成方法
		    		self.onComplete("全部完成");
		    	}
		    }, false);  
		    // 错误
		    xhr.addEventListener("error", function(e){
		    	// 回调到外部
		    	self.onFailure(file, xhr.responseText);
		    }, false);  
			
			xhr.open("POST",self.url, true);
			xhr.setRequestHeader("X_FILENAME", file.name);
			xhr.send(formdata);
		},
		// 返回需要上传的文件
		funReturnNeedFiles : function(){
			return this.uploadFile;
		},
		
		// 初始化
		init : function(){  // 初始化方法，在此给选择、上传按钮绑定事件
			var self = this;  // 克隆一个自身
			
			if (this.dragDrop) {
				this.dragDrop.addEventListener("dragover", function(e) { self.funDragHover(e); }, false);
				this.dragDrop.addEventListener("dragleave", function(e) { self.funDragHover(e); }, false);
				this.dragDrop.addEventListener("drop", function(e) { self.funGetFiles(e); }, false);
			}
			
			// 如果选择按钮存在
			if(self.fileInput){
				// 绑定change事件
				this.fileInput.addEventListener("change", function(e) {
					self.funGetFiles(e); 
				}, false);	
			}
			
			// 如果上传按钮存在
			if(self.uploadInput){
				// 绑定click事件
				this.uploadInput.addEventListener("click", function(e) {
					self.funUploadFiles(e); 
				}, false);	
			}
		}
};

	(function($,undefined){
	$.fn.zyUpload = function(options,param){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("zyUpload - No such method: " + options);
			}
		}

		return this.each(function(){
			var para = {};    // 保留参数
			var self = this;  // 保存组件对象
			
			var defaults = {
					width            : "700px",  					// 宽度
					height           : "400px",  					// 宽度
					itemWidth        : "140px",                     // 文件项的宽度
					itemHeight       : "120px",                     // 文件项的高度
					url              : "/upload/UploadAction",  	// 上传文件的路径
					multiple         : true,  						// 是否可以多个文件上传
					dragDrop         : true,  						// 是否可以拖动上传文件
					del              : true,  						// 是否可以删除文件
					finishDel        : false,  						// 是否在上传文件完成后删除预览
					/* 提供给外部的接口方法 */
					onSelect         : function(selectFiles, files){},// 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
					onDelete		 : function(file, files){},     // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
					onSuccess		 : function(file){},            // 文件上传成功的回调方法
					onFailure		 : function(file){},            // 文件上传失败的回调方法
					onComplete		 : function(responseInfo){},    // 上传完成的回调方法
			};
			
			para = $.extend(defaults,options);
			
			this.init = function(){
				this.createHtml();  // 创建组件html
				this.createCorePlug();  // 调用核心js
			};
			
			/**
			 * 功能：创建上传所使用的html
			 * 参数: 无
			 * 返回: 无
			 */
			this.createHtml = function(){
				var multiple = "";  // 设置多选的参数
				para.multiple ? multiple = "multiple" : multiple = "";
				var html= '';
				
				if(para.dragDrop){
					// 创建带有拖动的html
					html += '<form id="uploadForm" action="'+para.url+'" method="post" enctype="multipart/form-data">';
					html += '	<div class="upload_box">';
					html += '		<div class="upload_main">';
					html += '			<div class="upload_choose">';
	            	html += '				<div class="convent_choice">';
	            	html += '					<div class="andArea">';
	            	html += '						<div class="filePicker">点击选择文件</div>';
	            	html += '						<input id="fileImage" type="file" size="30" name="fileselect[]" '+multiple+'>';
	            	html += '					</div>';
	            	html += '				</div>';
					html += '				<span id="fileDragArea" class="upload_drag_area">或者将文件拖到此处</span>';
					html += '			</div>';
		            html += '			<div class="status_bar">';
		            html += '				<div id="status_info" class="info">选中0张文件，共0B。</div>';
		            html += '				<div class="btns">';
		            html += '					<div class="webuploader_pick">继续选择</div>';
		            html += '					<div class="upload_btn">开始上传</div>';
		            html += '				</div>';
		            html += '			</div>';
					html += '			<div id="preview" class="upload_preview"></div>';
					html += '		</div>';
					html += '		<div class="upload_submit">';
					html += '			<button type="button" id="fileSubmit" class="upload_submit_btn">确认上传文件</button>';
					html += '		</div>';
					html += '		<div id="uploadInf" class="upload_inf"></div>';
					html += '	</div>';
					html += '</form>';
				}else{
					var imgWidth = parseInt(para.itemWidth.replace("px", ""))-15;
					
					// 创建不带有拖动的html
					html += '<form id="uploadForm" action="'+para.url+'" method="post" enctype="multipart/form-data">';
					html += '	<div class="upload_box">';
					html += '		<div class="upload_main single_main">';
		            html += '			<div class="status_bar">';
		            html += '				<div id="status_info" class="info">选中0张文件，共0B。</div>';
		            html += '				<div class="btns">';
		            html += '					<input id="fileImage" type="file" size="30" name="fileselect[]" '+multiple+'>';
		            html += '					<div class="webuploader_pick">选择文件</div>';
		            html += '					<div class="upload_btn">开始上传</div>';
		            html += '				</div>';
		            html += '			</div>';
		            html += '			<div id="preview" class="upload_preview">';
				    html += '				<div class="add_upload">';
				    html += '					<a style="height:'+para.itemHeight+';width:'+para.itemWidth+';" title="点击添加文件" id="rapidAddImg" class="add_imgBox" href="javascript:void(0)">';
				    html += '						<div class="uploadImg" style="width:'+imgWidth+'px">';
				    html += '							<img class="upload_image" src="control/images/add_img.png" style="width:expression(this.width > '+imgWidth+' ? '+imgWidth+'px : this.width)" />';
				    html += '						</div>';
				    html += '					</a>';
				    html += '				</div>';
					html += '			</div>';
					html += '		</div>';
					html += '		<div class="upload_submit">';
					html += '			<button type="button" id="fileSubmit" class="upload_submit_btn">确认上传文件</button>';
					html += '		</div>';
					html += '		<div id="uploadInf" class="upload_inf"></div>';
					html += '	</div>';
					html += '</form>';
				}
				
	            $(self).append(html).css({"width":para.width,"height":para.height});
	            
	            // 初始化html之后绑定按钮的点击事件
	            this.addEvent();
			};
			
			/**
			 * 功能：显示统计信息和绑定继续上传和上传按钮的点击事件
			 * 参数: 无
			 * 返回: 无
			 */
			this.funSetStatusInfo = function(files){
				var size = 0;
				var num = files.length;
				$.each(files, function(k,v){
					// 计算得到文件总大小
					size += v.size;
				});
				
				// 转化为kb和MB格式。文件的名字、大小、类型都是可以现实出来。
				if (size > 1024 * 1024) {                    
					size = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';                
				} else {                    
					size = (Math.round(size * 100 / 1024) / 100).toString() + 'KB';                
				}  
				
				// 设置内容
				$("#status_info").html("选中"+num+"张文件，共"+size+"。");
			};
			
			/**
			 * 功能：过滤上传的文件格式等
			 * 参数: files 本次选择的文件
			 * 返回: 通过的文件
			 */
			this.funFilterEligibleFile = function(files){
				var arrFiles = [];  // 替换的文件数组
				for (var i = 0, file; file = files[i]; i++) {
					if (file.size >= 51200000) {
						alert('您这个"'+ file.name +'"文件大小过大');	
					} else {
						// 在这里需要判断当前所有文件中
						arrFiles.push(file);	
					}
				}
				return arrFiles;
			};
			
			/**
			 * 功能： 处理参数和格式上的预览html
			 * 参数: files 本次选择的文件
			 * 返回: 预览的html
			 */
			this.funDisposePreviewHtml = function(file, e){
				var html = "";
				var imgWidth = parseInt(para.itemWidth.replace("px", ""))-15;
				
				// 处理配置参数删除按钮
				var delHtml = "";
				if(para.del){  // 显示删除按钮
					delHtml = '<span class="file_del" data-index="'+file.index+'" title="删除"></span>';
				}
				
				// 处理不同类型文件代表的图标
				var fileImgSrc = "";
				if(file.type.indexOf("rar") > 0){
					fileImgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACxFBMVEUAAABseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoH///+c1q2DAAAA6nRSTlMAAApTwfXcMhGM8sAjC5D95aifnJudnqr0thxVhykDAiYzHwHh/rEYZAYJtfHu8JEe4/alEvOJj/r8mA7kQ1hWfL0qTUxPRAh9E/d5pvnSF65rBKDQt14iPj0/Nb/pUXKWkpRZKMbiRsJ+Ls7aO+3s1TEhLzDED9vIX62srxAd30XgviCO2BTR5rMZdNOyo/vqpzwNbZqhxRt43cnKV2dgdWgF6LrnGifULO8HtG+EZVK8y8zN1t4tXIWDfzZBFbC5+MfZ12lwanNKqauNbEc5S+s4giU0SVBOYSQriEJmDF1xu4qLhmOZFs/zjYs7AAAAAWJLR0Trv90muAAABXVJREFUWMO1l/lbE0cYx3kjFiTGCAqlohshLLhRUNEAa6wXCBq7qFGrCAFRoWo9QFBREbVWREWDtYoVrBoPClRFodIDS2mt1dajVK1Wa+/z/Ss6u4S4u2xCwvP0m19mZ+b9ZOadd96Z8fEBVR/fvuhGL/gB+LgW+PcLQPdS93dH0AzQImoHqgODBg3mFRwSJFLIi6GE8NIQN4Qw8v8BQ4dpKN3wcD8/v/AIPYgVEUkAdFS0a4IvsR/BgA8YRo6KiYmJHU2Ju8KYSBwbh9px410CjEgPJfbEl75I0zQO7gaIT0hEdoLJFQFx4jC+DaiXJ4WFhU0O18sBU0yDWUyMV4ErwFRHE0xLSk5Onp6SClLADJg5TovmWQy4ALyicwDiWY7j2LTZ3QAwew6NxrkWUAbMcwwahnJms5mbrwCAIQsQY17VgXvAwkXp6emLMxgFACzMRLRmKS1mFwCY7CU5OTlLl+nkTiQAH4DluYh5rykQnADVCiFugy1ywEreCmDV64ir13QnOAGGqLVWq3VdQrc4yBHGBJCRj5hW0I3gBOjWFxYVFRVEWEDmgw0bhQqA9E2IxcvlBJETN8/ZsnVrydJtYkDpdoxxjBtgx07EN3bJCCLAm4ITdkeLAWV7EKMcGwH0SeVI790nJYgA+/MrKiryD5SJAZaDiLZBjs0I+rBKpA/NVAQAqPb151Uq9iLAW1ZENndZ6cbDvExvG5E9slE8BifAdLS4iii35JhkGah3+HxnPl6dK6iGfHEnFAHDB3YmsIA1khFC6rvbtbIcNwKUppBkxonqzDykT0qdBNTwEYFqpzJrOEUAQALiKYY5bcMg+a4DsBucYgrPKANSz6KZhHrROtxT5jJ98bTl55QB53djeS3Z+e+hta5XgIx6rPEHaHgfueReAAAuaHG0jmz8i4hT3J0jrgBUIGovmfz9TY1xeFnTC8C2K0hvampubvrAhlcjegGoLX8eJ7JQ8gzQcqhkjkMlW3oD0DEiUd4DPNf/DiBpoeXDlR+51sUJoTjyY1L4ZPMqFR8wUgBAeIk1ET2SrXJvKzGVAACurfbMulPHU+SAY1e8sUecXysBAMzSegdgL0oBqqne2SPulAI+TetqiGwjIflZ1e72Tn+pt37O8oVNJF5LzlZ9wTk9KQVEX+9qOKiyWyx2Q/SXsYJdf13dWL6Q0CBUn78R0NXRFeAoVfbV/pu3Gpiv+a94HTDf8IXbEH3n5s27dsOBHgH6lkrE+sV8osH6e/Zw/bdGAZBRj9jxHczwAHCOtZXfg/vkQ334QVu0f40AeLiOteX5Oc5Rt1Mwff/o8UPLrmayVj/AhYAdMIXmAdtuPXpcQD1J6xFg0WkswEwqJjOIfEJy/hJdbR4B6CkNBYZLzdoeAboHlwPXU6d5by+xNKRkLbbz/rwNT9UHS+3Zz98Hrn2wqgMDTZYfWTQ+A4OK/OCWkQBaYzFIw+TQHjixA9t/gtlVWD3Tf1x1bnXwz8SNZBViMe4XGNKkDODvIyIAbi+Cu5V34NkoUrO2FWZhPx6Aq6fB9NjOfu1SQOqCLkBm1g3eakGfyb6nHkcJVUeSfjUemH6Kn35b4yTHX12X7cZLXUGu5YS0QnPtNo7TOqo4mnVWC1sDuWxZPhj/m3ebUX1MnpHqNtBe2FcXgui630kY8/vV0HZ3IpO0CYW+O//g74zEX5KzFOy70u+60Y4/bZiQwpcWrbeDkNYHPvXiXABLEOJfYgMSqwMaPCaQC/MZZE+I+5MsGDqX8ZAAUEhCMCZD3L2RxIvx7zoVBT1Kb//nJB/rUYfFAM1o4embGRgkefMqKGReW0Ucsb/aKrkCefD4loj995rsMCbP/xV9PTW3Rd5/IrX/D5m/XhrVeoY7AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE0LTA0LTIyVDEwOjExOjE0KzA4OjAw0j4tYwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNC0wNC0yMlQxMDoxMToxNCswODowMKNjld8AAABNdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuOC44LTcgUTE2IHg4Nl82NCAyMDE0LTAyLTI4IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3JnWaRffwAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMjU26cNEGQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAyNTZ6MhREAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADEzOTgxMzI2NzQObCDyAAAAE3RFWHRUaHVtYjo6U2l6ZQA3LjA3S0JCimaNMgAAAGJ0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvZnRwLzE1MjAvZWFzeWljb24uY24vZWFzeWljb24uY24vY2RuLWltZy5lYXN5aWNvbi5jbi9wbmcvMTE0NTkvMTE0NTk3NS5wbmfZbDvGAAAAAElFTkSuQmCC";
				}else if(file.type.indexOf("zip") > 0){
					fileImgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACr1BMVEUAAABseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoH///8faE5ZAAAA43RSTlMAAApTwfXcMhGM8sAjC5D95aifnZucnqr0thxVhykDATMrBR/h/rEYZAaC8O7IFh7j9qUS84vWiY/6/JgO5DBZWFZHCHy9NE1QUVI9fRP3eaYCBKv5vheua6Cp+7u3Xio+P0Ai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";
				}else if(file.type.indexOf("text") > 0){
					fileImgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAClFBMVEUAAABseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoH///83TFW4AAAA2nRSTlMAAApTwfXcMhGM8sAjC5D95aifnqr0thxVhykDAR/h/rEYZAYe4/alEvOJj/r8mA7kfA2bvTVSUUJ9E6T3eaYC+c0UF61rBKCi+8ruXkA/NAUhvuknxuJGJTkufto7x5LU0jHOxA88yChQQR3fROAg0UyzGSwro5xUp5nt6t5Zmjp43clXRWkIZya/GhUJL+jnXI6NcxDQuq6wGy2FhLWDf18zrzbLtKy7udPZ150WwnF0S/hdd3todXLYMOa4SvCKTySylwcMt25wTfHvbM9liz1Hhj5jzGCRgnatOOwAAAABYktHRNuZBBYUAAAEgElEQVRYw72X+19TZRjA90xXczTHpUmw4w5sggw208VFYbax2LFhxnTQBelCiBEKJLEyYVmAUCQIRQakXURKDSUiK7tplt0sy+49f03vOWPjnLOd3fp8+v6wz3vOeZ/v3vtFJgP5suUKjMINNwLIpAHlChVGJ+WmaAb1Sg2iJjUlLT0jPZyMm7XEsCoziuEW8v+qrGy1joJIrNYTAZ2TK21YTuINRqnPsEaPefmoWVsgKTAhnSUZzwkKi8xoWXerVB7E9dnSFWQFG6y3WdBcKAcpQbEcqJLSsjA2koKxgk1QXqFB22aJciLebgddBe0QY6l0BgVwRxWNJhcDkQVbKNDd6baJcVQvCSBzFeLWu+wgJaCyt90tZluNZ0kA23cgessidSYniNqIRCADqK1DvOfeCIZACe67P5x6JlCCnWwUQH0lYsMD4QZOYE/PV4lRPFgeEDzEVR2g5GHExkfCDIFGXItuMXTTYiPuauZiAHY3ID7aIjYEqlBT9piYslZ2HOzZi1sXyw3Q1o64o0NkiNGIzscRcxYnAlD7UpHufEJo4ASQ2eUL0pXNG7TAPInofmpxMgK134v00+XhAvuBbm+QHn8NTwC7vYiWumf2NFs5XCa0HGzmlyHQiGm8Bcj0LO8z6J5j1ztbb18dRzV5cvSHCahDroEQhlx+EWHw+b0a0RpnAHEVZFEA3QuGtJQQQ9WOCAJQvhjO4eDcAfAMhzCOHIkgsBf5G8T0diojlQxaRiMIBI0YpNEZv4Aae2mFmJfH1fELQr1O8YH4BaBWcryii9oh0gJ71tFKQtOrHUkKgo042pJsCcZzJgiTGVNJCoAxBqCSFMSK+j8FAPLXxnYek+b4Oi2+/gZJvPlWvZwdKUIBwIlprxnjwt3TeZKECgQArQ3xRQfobRMLpmYSiUc8WiuaC5s1iQksx4UCeXFi8YjtQsHhxtAXeqZqguPt7r53TuUjKk5XnenuDLybeDfUkkJB7mxIoBkDhoxPRudsmlQ2TyOetZ6bm1Hq2HeMvTCUT1JAV7w3/z7lHBjfkLfwAZzI0/vgvFv/4fhHBfZlH18oji1AmiaHHx/ZiRA/qYXzA/Ap2Rlp/KyW+Zx9F1uA7OnJ18Mlzg4PD6onuORoC3Oanyc+gfYLAEP+fxBc3EgEtuQF9CWjh7FOJy9oWg3z/TDiT1ag+hJq1s9eBpctpoA9jwgF5HRAFxmtXyF+feWbKlbAduMSC0LB4LcCwVzpdxfJCfX7H46RHrg6v2+TCfHHn/Zf42WZFc3Gnx18gcZhptlfh4Ub9o4F8kSbHbwZ67ggWg8KTmFCpEyJV6SuXXQC8X0jEDju89bENZf82oVokEq6uYSi/Rf2zIg4JNjGwdNx/dcoHPrNjUVtbOr37R7glvVUXwL7AjDpiH/wA1SIK6/EbQC4fgQt/fz8ZGnQuoxxGgBG/iQDo4SfvfQqOVoe6JLrICaU59xf7FjPsfIF6r+5q+9Q5Kuv4Bq8ZfIMuyb4TwrOPnFcvgVYrrWKNmNy/Z9TxBvu1v9zWRj/L2YYO72zRvyOAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE0LTA0LTIyVDEwOjExOjE1KzA4OjAwdEkm1wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNC0wNC0yMlQxMDoxMToxNSswODowMAUUnmsAAABNdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuOC44LTcgUTE2IHg4Nl82NCAyMDE0LTAyLTI4IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3JnWaRffwAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMjU26cNEGQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAyNTZ6MhREAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADEzOTgxMzI2NzV5axBkAAAAE3RFWHRUaHVtYjo6U2l6ZQA1Ljg5S0JCzVag6QAAAGJ0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvZnRwLzE1MjAvZWFzeWljb24uY24vZWFzeWljb24uY24vY2RuLWltZy5lYXN5aWNvbi5jbi9wbmcvMTE0NTkvMTE0NTk3OC5wbmch/P93AAAAAElFTkSuQmCC";
				}else{
					fileImgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAClFBMVEUAAABseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoFseoH///83TFW4AAAA2nRSTlMAAApTwfXcMhGM8sAjC5D95aifnqr0thxVhykDAR/h/rEYZAYe4/alEvOJj/r8mA7kfA2bvTVSUUJ9E6T3eaYC+c0UF61rBKCi+8ruXkA/NAUhvuknxuJGJTkufto7x5LU0jHOxA88yChQQR3fROAg0UyzGSwro5xUp5nt6t5Z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";
				}
				
				
				// 图片上传的是图片还是其他类型文件
				if (file.type.indexOf("image") == 0) {
					html += '<div id="uploadList_'+ file.index +'" class="upload_append_list">';
					html += '	<div class="file_bar">';
					html += '		<div style="padding:5px;">';
					html += '			<p class="file_name">' + file.name + '</p>';
					html += delHtml;   // 删除按钮的html
					html += '		</div>';
					html += '	</div>';
					html += '	<a style="height:'+para.itemHeight+';width:'+para.itemWidth+';" href="#" class="imgBox">';
					html += '		<div class="uploadImg" style="width:'+imgWidth+'px">';				
					html += '			<img id="uploadImage_'+file.index+'" class="upload_image" src="' + e.target.result + '" style="width:expression(this.width > '+imgWidth+' ? '+imgWidth+'px : this.width)" />';                                                                 
					html += '		</div>';
					html += '	</a>';
					html += '	<p id="uploadProgress_'+file.index+'" class="file_progress"></p>';
					html += '	<p id="uploadFailure_'+file.index+'" class="file_failure">上传失败，请重试</p>';
					html += '	<p id="uploadSuccess_'+file.index+'" class="file_success"></p>';
					html += '</div>';
                	
				}else{
					html += '<div id="uploadList_'+ file.index +'" class="upload_append_list">';
					html += '	<div class="file_bar">';
					html += '		<div style="padding:5px;">';
					html += '			<p class="file_name">' + file.name + '</p>';
					html += delHtml;   // 删除按钮的html
					html += '		</div>';
					html += '	</div>';
					html += '	<a style="height:'+para.itemHeight+';width:'+para.itemWidth+';" href="#" class="imgBox">';
					html += '		<div class="uploadImg" style="width:'+imgWidth+'px">';				
					html += '			<img id="uploadImage_'+file.index+'" class="upload_image" src="' + fileImgSrc + '" style="width:expression(this.width > '+imgWidth+' ? '+imgWidth+'px : this.width)" />';                                                                 
					html += '		</div>';
					html += '	</a>';
					html += '	<p id="uploadProgress_'+file.index+'" class="file_progress"></p>';
					html += '	<p id="uploadFailure_'+file.index+'" class="file_failure">上传失败，请重试</p>';
					html += '	<p id="uploadSuccess_'+file.index+'" class="file_success"></p>';
					html += '</div>';
				}
				
				return html;
			};
			
			/**
			 * 功能：调用核心插件
			 * 参数: 无
			 * 返回: 无
			 */
			this.createCorePlug = function(){
				var params = {
					fileInput: $("#fileImage").get(0),
					uploadInput: $("#fileSubmit").get(0),
					dragDrop: $("#fileDragArea").get(0),
					url: $("#uploadForm").attr("action"),
					
					filterFile: function(files) {
						// 过滤合格的文件
						return self.funFilterEligibleFile(files);
					},
					onSelect: function(selectFiles, allFiles) {
						para.onSelect(selectFiles, allFiles);  // 回调方法
						// self.funSetStatusInfo(ZYFILE.funReturnNeedFiles());  // 显示统计信息
						var html = '', i = 0;
						// 组织预览html
						var funDealtPreviewHtml = function() {
							var file = selectFiles[i];
							if (file) {
								var reader = new FileReader()
								reader.onload = function(e) {
									// 处理下配置参数和格式的html
									html += self.funDisposePreviewHtml(file, e);
									
									i++;
									// 再接着调用此方法递归组成可以预览的html
									funDealtPreviewHtml();
								}
								reader.readAsDataURL(file);
							} else {
								// 走到这里说明文件html已经组织完毕，要把html添加到预览区
								funAppendPreviewHtml(html);
							}
						};
						
						// 添加预览html
						var funAppendPreviewHtml = function(html){
							// 添加到添加按钮前
							if(para.dragDrop){
								$("#preview").append(html);
							}else{
								$(".add_upload").before(html);
							}
							// 绑定删除按钮
							funBindDelEvent();
							funBindHoverEvent();
						};
						
						// 绑定删除按钮事件
						var funBindDelEvent = function(){
							if($(".file_del").length>0){
								// 删除方法
								$(".file_del").click(function() {
									ZYFILE.funDeleteFile(parseInt($(this).attr("data-index")), true);
									return false;	
								});
							}
							
							if($(".file_edit").length>0){
								// 编辑方法
								$(".file_edit").click(function() {
									// 调用编辑操作
									ZYFILE.funEditFile(parseInt($(this).attr("data-index")), true);
									return false;	
								});
							}
						};
						
						// 绑定显示操作栏事件
						var funBindHoverEvent = function(){
							$(".upload_append_list").hover(
								function (e) {
									$(this).find(".file_bar").addClass("file_hover");
								},function (e) {
									$(this).find(".file_bar").removeClass("file_hover");
								}
							);
						};
						
						funDealtPreviewHtml();		
					},
					onDelete: function(file, files) {
						// 移除效果
						$("#uploadList_" + file.index).fadeOut();
						// 重新设置统计栏信息
						self.funSetStatusInfo(files);
						console.info("剩下的文件");
						console.info(files);
					},
					onProgress: function(file, loaded, total) {
						var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
						if(eleProgress.is(":hidden")){
							eleProgress.show();
						}
						eleProgress.css("width",percent);
					},
					onSuccess: function(file, response) {
						$("#uploadProgress_" + file.index).hide();
						$("#uploadSuccess_" + file.index).show();
						$("#uploadInf").append("<p>上传成功，文件地址是：" + response + "</p>");
						// 根据配置参数确定隐不隐藏上传成功的文件
						if(para.finishDel){
							// 移除效果
							$("#uploadList_" + file.index).fadeOut();
							// 重新设置统计栏信息
							self.funSetStatusInfo(ZYFILE.funReturnNeedFiles());
						}
					},
					onFailure: function(file) {
						$("#uploadProgress_" + file.index).hide();
						$("#uploadSuccess_" + file.index).show();
						$("#uploadInf").append("<p>文件" + file.name + "上传失败！</p>");	
						//$("#uploadImage_" + file.index).css("opacity", 0.2);
					},
					onComplete: function(response){
						console.info(response);
					},
					onDragOver: function() {
						$(this).addClass("upload_drag_hover");
					},
					onDragLeave: function() {
						$(this).removeClass("upload_drag_hover");
					}

				};
				
				ZYFILE = $.extend(ZYFILE, params);
				ZYFILE.init();
			};
			
			/**
			 * 功能：绑定事件
			 * 参数: 无
			 * 返回: 无
			 */
			this.addEvent = function(){
				// 如果快捷添加文件按钮存在
				if($(".filePicker").length > 0){
					// 绑定选择事件
					$(".filePicker").bind("click", function(e){
		            	$("#fileImage").click();
		            });
				}
	            
				// 绑定继续添加点击事件
				$(".webuploader_pick").bind("click", function(e){
	            	$("#fileImage").click();
	            });
				
				// 绑定上传点击事件
				$(".upload_btn").bind("click", function(e){
					// 判断当前是否有文件需要上传
					if(ZYFILE.funReturnNeedFiles().length > 0){
						$("#fileSubmit").click();
					}else{
						alert("请先选中文件再点击上传");
					}
	            });
				
				// 如果快捷添加文件按钮存在
				if($("#rapidAddImg").length > 0){
					// 绑定添加点击事件
					$("#rapidAddImg").bind("click", function(e){
						$("#fileImage").click();
		            });
				}
			};
			
			
			// 初始化上传控制层插件
			this.init();
		});
	};
})(jQuery);


}

export {
	zyupload
}

