const {dateFormat,dateDiff,firstDateOfMonth,lastDateOfMonth,selected_YY_MM} = await import(`../Hooks/DateFunctions/DateFunctions.js${app_version}`)
export class Calendar{   
    constructor(userId){
        this.userId = userId
        this.data = {}  //Ide jönnek a foglalások
        this.download()
    }
    init(date){
        this.wrapper =  selected_YY_MM(date)
        this.curYear = this.wrapper.year
        this.curMonth = this.wrapper.month
        this.cal_header = `${this.wrapper.year} ${ this.wrapper.monthLong}`

        this.firstDay = firstDateOfMonth(date)
        this.lastDay = lastDateOfMonth(date)
        const context = this.build()
        return `<div id="container-fluid" >
                    <div class="calendar">
                        <div class="calendar-header text-center h4">${this.cal_header}</div>
                        <div class="calendar-controls  text-center">
                            <button class="cal_prev"><</button>
                            <button class="cal_next">></button>
                        </div>
                        <div class="wrapper">${context}</div>
                    </div>
                </div>`
    }
    build(){
     
        const Calendar = []
        for(let day=1;day<= dateDiff(this.firstDay,this.lastDay) +1;day++){
            const date = new Date(this.firstDay.date)
            const tmp = date.setDate( new Date(this.firstDay.date).getDate() + (day-1) );
            Calendar.push( dateFormat(new Date(tmp)) )
        }
        let weekNo = -1;
        const Weeks = []
        Calendar.forEach((itm,key)=>{
            if(key == 0 || itm.dayName == "H"){
                weekNo++
                Weeks.push([])
            }
            Weeks[weekNo].push( itm )
        })

        let context = ``
        let orientation = ``
        Weeks.forEach((week,key)=>{
            let weekData = ``
            week.forEach(day=>{
                weekData += this.DayPanel(day)
            })
            orientation = key == 0 ? 'justify-content-end' : `justify-content-start`
            context += `<div class="week d-flex  ${orientation}">${weekData}</div>`
        })
        return context
    }
    DayPanel(data){
        let statusColor = `activeDay`
        let dayNameOrientation = ``
        let changeStatusText = `+`
        let changeStatusOrientation = `btn-success float-start`

        if( this.data[data.date] != null && this.data[data.date].checked == true){
                changeStatusOrientation = ` btn-danger float-end `
                changeStatusText = `btn-danger float-end`
                changeStatusText = `-`
                statusColor = `inactiveDay`
        }

        return  `
                <div class="day" date="${data.date}">
                    <div class="text-center">
                        <b>${data.day}</b> ${data.dayName}</div>
                    <div class="dayCtn  ${statusColor}">
                        
                        <button class="changeStatus btn btn-sm ${changeStatusOrientation} text-center">${changeStatusText}</button>
                    </div>
                </div>`
    }
    setDateStatus(e){
        e.userId = this.userId == null ? null : this.userId
        this.data[e.date] = {checked:e.checked, userId:e.userId}
        this.upload()
    }
    upload(){
        console.log(  this.data )
    }
    download(){
        //Ide jön az endpoint lekérés
        const result = null
        if(result != null){ this.data = result }
        else{ console.log("A szerverről nem jött adat!") }
    }
    events(){
        const calendar = document.querySelector(".calendar") 
        const changeStatus = calendar.querySelectorAll(".changeStatus") 
        changeStatus.forEach(itm=>{
            itm.addEventListener("click",(e)=>{
                e.target.classList.toggle("btn-success")
                e.target.classList.toggle("btn-danger")
                e.target.classList.toggle("float-start")
                e.target.classList.toggle("float-end")

                const statusText = e.target.classList.contains("btn-success") ? "+" : "-"
                e.target.textContent =  statusText
                const checked = e.target.classList.contains("btn-success") ?  false : true 

                e.target.parentNode.classList.toggle("activeDay")
                e.target.parentNode.classList.toggle("inactiveDay")
                this.setDateStatus({date:e.target.parentNode.parentNode.getAttribute("date"), statusText:statusText,checked:checked})
            })
        })


        //Control panel
        const cal_prev = document.querySelector(".cal_prev") 
        const cal_next = document.querySelector(".cal_next") 

        cal_prev.addEventListener("click",(e)=>{
            if(this.curMonth > 0 ){  this.curMonth-- }
            else{
                this.curMonth = 11
                this.curYear--
            }
            calendar.innerHTML = this.init( dateFormat(new Date(`${this.curYear}-${this.curMonth+1}-01`) ).date )
            this.events()
        })

        cal_next.addEventListener("click",(e)=>{
            if(this.curMonth < 11 ){  this.curMonth++ }
            else{
                this.curMonth = 0
                this.curYear++
            }
            calendar.innerHTML = this.init( dateFormat(new Date(`${this.curYear}-${this.curMonth+1}-01`) ).date )
            this.events()
        })

    }
}