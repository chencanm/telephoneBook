(function(){

    var tbody = document.querySelector('#tbody'),
        isInsert = true  //是否新增

    var init = function(){
        main()
    }

    var main = function(){
        //点击保存
        btn.onclick = function(){
            var name = document.getElementById('name').value,
                tel = document.getElementById('number').value

            if(name==""||tel==""){
                alert('姓名或电话不能为空！！！')
            }else if(!(/^1[3456789]\d{9}$/).test(tel)){
                alert('电话格式不正确！！！')
            }else if(name.length>10){
                alert('名字太长了！！！')
            }else{ 
                saveTr(name,tel)
                document.getElementById('name').value = ""
                document.getElementById('number').value = ""
                document.querySelectorAll('.item').forEach(function(e){
                    e.classList.remove('target')
                })  
                isInsert = true
            }
        }
    }
    //保存
    function saveTr(name,tel){
        isInsert ? insertTr(name,tel) : updataTr(name,tel)
        
        //点击修改
        document.querySelectorAll('.updata').forEach(function(e){
            e.onclick = function(e){
                isInsert = false
                this.parentNode.parentNode.classList.add("target")
                var allTag = document.querySelectorAll('.target')
                if(allTag.length>1){
                    alert('还未保存！')
                    this.parentNode.parentNode.classList.remove('target')
                }
                var tds = document.querySelector('.target').querySelectorAll('td')
                document.getElementById('name').value = tds[1].innerHTML
                document.getElementById('number').value = tds[2].innerHTML
            }
        })
        
        //删除
        document.querySelectorAll('.delete').forEach(function(e){
            e.onclick = deleteTr
        }) 
    }

    //新增
    function insertTr(name,tel){
        var tr = document.createElement('tr'),
            tdI = document.createElement('td'),
            tdName = document.createElement('td'),
            tdTel = document.createElement('td'),
            tdButton = document.createElement('td'),
            UpdataButton = document.createElement('button'),
            deleteButton = document.createElement('button')
        UpdataButton.className = "updata"
        UpdataButton.innerHTML = "修改"
        deleteButton.className = "delete"
        deleteButton.innerHTML = "删除"
        tr.className = "item"

        tdI.innerHTML = document.querySelectorAll("tr").length
        tdName.innerHTML = name
        tdTel.innerHTML = tel

        tdButton.appendChild(UpdataButton)
        tdButton.appendChild(deleteButton)
        tr.appendChild(tdI)
        tr.appendChild(tdName)
        tr.appendChild(tdTel)
        tr.appendChild(tdButton)

        tbody.appendChild(tr)
    }
    //修改
    function updataTr(name,tel){
        var tds = document.querySelector('.target').querySelectorAll('td')
        tds[1].innerHTML = name
        tds[2].innerHTML = tel
    }

    //删除
    function deleteTr(){
        this.parentNode.parentNode.remove()
        var len = document.getElementsByClassName('item').length
        var tr = document.querySelectorAll('tbody tr')
        for(let i=0;i<len;i++){
            tr[i].firstElementChild.innerHTML= i+1
        }  
        document.getElementById('name').value = ""
        document.getElementById('number').value = ""
    }

    init()
}())