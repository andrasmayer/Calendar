export const dayNames = [ "H","K","Sze","Cs","P","Szo","V"]
export const MonthNamesShort = [ "Jan","Feb","Már","Ápr","Máj","Jún","Júl","Aug","Szep","Okt","Nov","Dec"]
export const MonthNamesLong = [ "Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"]

export const dateFormat = (e) =>{
    let yy = e.getFullYear()
    let mm = e.getMonth()+1
    if(mm<10){ mm = `0${mm}` }
    let dd = e.getDate()
    if(dd<10){ dd = `0${dd}` }
    return({
        date:`${yy}-${mm}-${dd}`,
        dayName:dayNames[ e.getDay() == 0 ? 6 : e.getDay()-1],
        year:yy,
        month:e.getMonth(),
        monthShort: MonthNamesShort[e.getMonth()],
        monthLong:  MonthNamesLong[e.getMonth()],
        day:  e.getDate()
    })
}

export const dateDiff = (date1,date2) =>{
    date1 = new Date(date1.date)
    date2 = new Date(date2.date)
    const Difference_In_Time = date2.getTime() - date1.getTime()
    const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
    return Difference_In_Days
}

export const firstDateOfMonth = (e) =>{
    const date = e == null ? new Date() : new Date(e)
    const month = date.getMonth(); // January
    const d = new Date(date.getFullYear(), month, 1);
    return  dateFormat(d)
}

export const lastDateOfMonth = (e) =>{
    const date = e == null ? new Date() : new Date(e)
    const month = date.getMonth(); // January
    const d = new Date(date.getFullYear(), month + 1, 0);
   return  dateFormat(d)
}
export const selected_YY_MM = (e) =>{
    e = e == null ?  new Date() : new Date(e)
    return dateFormat(e)
}