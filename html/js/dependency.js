							
function returnbook()
{
  $(".return").unbind().click(function(){
    var id = $(this).attr("id");
    $("tr#"+id).css("background-color","black");
    $("td[placeholder = "+id+"]").remove();
    var da = new Date();
    var ad = da.getFullYear() +"-"+ da.getMonth()+"-"+ da.getDate();
    $("tr#"+id).append("<td>"+ad+"</td>");
    var $a = $("tr#"+id).clone();
    $("#tbbody4").prepend($a);
    tableload("#dtBasicExample4");
    $.post("../access.php",{"type":"remove","data":id,"date":ad},function(data){
      //tableload("#dtBasicExample5");
      alert(data);
      $("tr#"+id).remove();
    });
      
      
  });
}

function tableload(data)
{
     if ( $.fn.dataTable.isDataTable( data ) ) 
     {
      
     }
    else
    {
      $(data).DataTable({
        "pagingType": "full_numbers" // "simple" option for 'Previous' and 'Next' buttons only
      });
      $('.dataTables_length').addClass('bs-select');
    }
}

function check()
	{
							$("input.childdel").click(function()
                                             {
                                             	
                                                //$(".childupd[value="+$(this).val()+"]").prop("checked",false);
                                                $("#updchk").prop("checked",false);	
                                                
                            					if($(this).prop("checked")==true)
                            					{
                            						$("#del").css("visibility","");
                            						$("#upd").css("visibility","hidden");
                            						$(".childupd").prop('checked',false);
                            					}
                            					else
                            					{
                            						var c=0;
                            						$("input.childdel").each(function(){
                            							
                            							if($(this).prop("checked")==true)
                            							{

                            								c=1;
                            							}

                            						   	});
                            						if(c==0)
                            						{
                            							
                            							$("#del").css("visibility","hidden");
                            						
                            						}
                            					}
                                            
                                             });


							$("input.childupd").click(function()
                                             { 	

                                             	
                                             	$("#delchk").prop("checked",false);
                                                //$(".childdel[value="+$(this).val()+"]").prop("checked",false);
                                            	if($(this).prop("checked")==true)
                            					{
                            						$("#upd").css("visibility","");
                            						$("#del").css("visibility","hidden");
                            						$(".childdel").prop('checked',false);
                            					}
                            					else
                            					{
                            						var c=0;
                            						$("input.childupd").each(function(){
                            							
                            							if($(this).prop("checked")==true)
                            							{

                            								c=1;
                            							}

                            						   	});
                            						if(c==0)
                            						{
                            							
                            							$("#upd").css("visibility","hidden");
                            						
                            						}
                            						//$("#upd").css("visibility","hidden");
                            					}
                                             });




                 	
               $("#updchk").click(function()
                  {
                            if($(this).prop('checked')==false)
                            {
                              $(".childupd").each(function(){
                                $(this).prop('checked',false);
                              });
                              $("#upd").css("visibility","hidden");
                            }
                            else
                            {   
                              $(".childupd").each(function(){
                                $(this).prop('checked',true);
                              });
                              $("#upd").css("visibility","");
                              $("#del").css("visibility","hidden");
                              $(".childdel").each(function(){
                                $(this).prop('checked',false);
                              });
                               $("#delchk").prop('checked',false);
                            }
                  });
               $("#delchk").click(function()
                  {
                            if($("#delchk").prop('checked')==false)
                            {
                              $(".childdel").each(function(){
                                $(this).prop('checked',false);
                              });
                              $("#del").css("visibility","hidden");
                            }
                            else
                            {
                              $(".childdel").each(function(){
                                $(this).prop('checked',true);
                              });
                              $("#del").css("visibility","");
                              $("#upd").css("visibility","hidden");
                              $(".childupd").each(function(){
                                $(this).prop('checked',false);
                              });
                              $("#updchk").prop('checked',false);
                            }

                  });

      $("#upd").click(function(){
        
        
      	var upddata = new Array();
      	$('input.childupd').each(function(){
      		console.log("in");
          if($(this).prop("checked")==true)
          {
          upddata.push($(this).val());     
      	  }

        });
       
         if(upddata.length>0)
         {		
         		$("li#tabdata>a").click();
               	$("li#tabupdate>a").click();
               	$("#parentopupd").css("visibility","");
               	$("#parentopupd2").css("visibility","hidden");
                 $("#opupd").empty();
                 $("#btn1").remove();
         		$.post("../update.php",{"data":upddata},function(data){
         			$("#opupd").append(data);
               console.log("visited");
               
         			});
               $("#parentopupd").append("<button class='btn btn-primary' id='btn1' type='submit'>Update</button>"); 
              
         }
         $("#updchk").prop("checked",false);
      	 $("#delchk").prop("checked",false);
      	 $(".childdel").prop('checked',false);
      	 $(".childupd").prop('checked',false);
      	 $("#srchres").empty();
         console.log("visited2");
        
      	 $("#btn1").unbind().click(function(){
      	console.log("btn");
      		var dat = new Array();
      		var c=0;
      		var d=0;
      		dat[c]=[];

      		$(".updfrm1").each(function(){
      			if(d==22)
      			{
      				c+=1;
      				d=0;
      				dat[c]=[];
      				//dat[c].length = 0;
      			}
      		dat[c].push($(this).val());
      		d+=1;
      		});
      		
      	//alert(final);
      	
		      	$.post("../update.php",{"type":"update","data":dat},function(data){
		      		alert(data);
		      		
		      		});  																		
      		});
     });

     //code for deleting data from database using search results
       $("#del").unbind().click(function(e){
        
        $("#opdel").empty();
        console.log(1);
      	var deldata = new Array();
      	$('input.childdel').each(function(){
      		console.log("in");
          if($(this).prop("checked")==true)
          {
          deldata.push($(this).val());     
      	  }

        });
       
         if(deldata.length>0)
         {		
         		$("li#tabdata>a").click();
               	$("li#tabdelete>a").click();
               	$("#parentopdel").css("visibility","");
                
                 $("#delbtn").remove();
         		$.post("../delete.php",{"type":"delete","data":deldata},function(data){
         			$("#opdel").append(data);
               
               });
               $("#parentopdel").append("<button type ='submit' class='btn btn-danger' id='delbtn'>Confirm delete</button>");
         }
         //e.stopPropagation();
         $("#delbtn").click(function(){
           var del = new Array();
           $("td.deldata").each(function(){
             del.push($(this).text());
           });
           $.post("../delete.php",{"type":"confirmdel","data":del},function(data){
            alert(data);
           });
         });
    });
    return false;
  }
     


// code for uploading sheet for updating data
   $(document).ready(function()
   {
   	$("form#frmupdUpload").submit(function() {
    //Image validation start
    $("#tbbody2").empty();
    var file_name=$('#inputFile2').val();
    var index_dot=file_name.lastIndexOf(".")+1;
    var ext=file_name.substr(index_dot);
    if(file_name=='') {
      alert('Please upload file');
    }
    else if(0) {
      alert('Please upload file');
    } //Image validation end
    else {
      //formdata object to send file upload data

      var formData = new FormData();
      formData.append('fileupload',$( '#inputFile2' )[0].files[0], file_name);
      formData.append('type',"fileupd");
      $.ajax({
        url: '../update.php',
         data: formData,
         processData: false,
         contentType: false,
         type: 'POST',
         success: function(data){
          $("#dtBasicExample3").css("visibility","");
          $("#tbbody2").append(data);
          tableload("#dtBasicExample3");
          
         }
          
      });

    }

    $('#frmupdUpload')[0].reset();
    return false;
  });
  

          });            

// code for access record tab
$(document).ready(function(){
  tableload("dtBasicExample4");
  $.post("../access.php",{"type":"true"},function(data){
    
    $("#tbbody3").append(data);
    tableload("#dtBasicExample4");
    returnbook();
   
    
    $("#accnbtn").click(function(){
      var d = new Array();
      $(".accessdata").each(function(){
        d.push($(this).val());
      });
      console.log(d);
      $.post("../access.php",{"type":"addrecord","data":d},function(data){
        if(data=="error")
        {
          alert("Book do not exist");
        }
        else
        {
        $("#tbbody3").prepend(data);
        //tableload("#dtBasicExample5");
       returnbook();
        }
        });
    });
});
});

$(document).ready(function(){
 
$.post("../access.php",{"type":"false"},function(data){
$("#tbbody4").append(data);
tableload("#dtBasicExample5");
});

});
function tables()
{
  
}