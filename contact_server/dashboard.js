var data_handle = null;
var count_data = 0;
var showmore_condition = false;
var doc_showMore = document.querySelector('.showMore');
window.onload = () => {

    var docs = document.querySelector('.infos');
    docs.innerHTML = "<p style='text-align:center;'>Loading...</p>";

    doc_showMore.style.display = "none";
    
    //Security_______________________________________________________
    var https = new XMLHttpRequest();
    https.open('POST', 'https://threemarysmiledentalclinicapi.onrender.com/checkingToken', true);
    https.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    https.send(JSON.stringify({ auth: localStorage.getItem('OOS_s') }))
    https.onload = async() => {
      let c = JSON.parse(https.response);
      if(c.response === 'success'){
        //getting the ACCEPTED APPOINTMENT_________________________________
        var http = new XMLHttpRequest();
        http.open('POST', 'https://threemarysmiledentalclinicapi.onrender.com/get_appointment');
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        http.send(JSON.stringify({ auth: localStorage.getItem('OOS_s') }));
        http.onload = async() => {
            let datas = JSON.parse(http.response);
            if(datas.response === 'success'){
                
                docs.innerHTML = '';

                let data = datas.data;
                data_handle = data;
        
                //all clients count__________________________________________
                let c = JSON.parse(http.response).count;
                let doc_count = document.querySelector('.numbClient');
                doc_count.innerHTML = c < 10 ? `0${c}`:c;
        
                let count = 0;
                for await(let arr of data){
                    if(arr.length > 0){
                        break;
                    }
                    count++;
                }
                
                let condition = false;
                for(let counts = (count+1);counts < data;counts++){
                    if(data[counts].length > 0){
                        condition = true;
                    }
                }

                doc_showMore.style.display = condition ? "block":"none";


                converted_append(data, count);
            }else{
                docs.innerHTML = "<p style='text-align:center;'>No record found</p>";
            }
        }
      }else{
        localStorage.clear();
        window.location.href = 'index.html';
      }
    }

    initClock();
}

async function converted_append(data, numb){
    count_data = numb;

    let arr_date = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    
    let year = new Date().getFullYear();

    let docs = document.querySelector('.infos');

    let arr_data = data[numb];

    
    let div_parent = document.createElement('div');
    div_parent.style.marginBottom = "30px";

    let p_month = document.createElement('p');
    p_month.className = "paMonthsS";
    p_month.innerHTML = `${arr_date[numb]} ${year}`;

    div_parent.appendChild(p_month);

    for await(let data_client of arr_data){
        let div_child = document.createElement('div');
        div_child.style.display = "flex";
        div_child.style.marginBottom = "15px";
        
        let div_client = document.createElement('div');
        div_client.className = "client_child";


        //Client Schedule______________________________________________

        //Image________
        let img_div = document.createElement('div');
        img_div.className = "clientImg";

        let img_div_child = document.createElement('div');
        img_div_child.className = "imgDiv";

        let img_final = document.createElement('img');
        img_final.className = "imgFinalU";
        img_final.src = "./static/img/user.png";

        img_div_child.appendChild(img_final);
        img_div.appendChild(img_div_child);



        //Info_________
        let doc_info = document.createElement('div');
        doc_info.style.marginLeft = "15px";
        
        let pa1 = document.createElement('p');
        pa1.innerHTML = data_client["last_Name"];
        pa1.className = "paName";


        let pa3 = document.createElement('p');
        pa3.innerHTML = data_client["date"];
        pa3.className = "painfo";

        let pa4 = document.createElement('p');
        pa4.innerHTML = data_client["time"];
        pa4.className = "painfo";

        doc_info.appendChild(pa1);
        doc_info.appendChild(pa3);
        doc_info.appendChild(pa4);


        div_client.appendChild(img_div);
        div_client.appendChild(doc_info);


        //Service_______________________________________________________
        let doc_parent_service = document.createElement('div');
        doc_parent_service.innerHTML = data_client["service"];;
        doc_parent_service.className = "serviceP";


        div_child.appendChild(div_client);
        div_child.appendChild(doc_parent_service);
        div_parent.appendChild(div_child);
    }   

    docs.appendChild(div_parent);        

}


function showMore(){

    if(!showmore_condition){
        for(let count = (count_data+1);count < data_handle.length;count++){
            if(data_handle[count].length > 0){
    
                let condition = false;
                for(let checking = (count+1);checking < data_handle.length;checking++){
                    if(data_handle[checking].length > 0){
                        condition = true;
                    }
    
                    if(checking+1 == data_handle.length){
                        if(!condition) {
                            showmore_condition = true;
                            doc_showMore.style.display = "none";
                        }
                        converted_append(data_handle, count);
                    }
                }
                break;
            }
        }
    }else{
    }



}