const {Calendar} = await import(`./src/Calendar.js${app_version}`)

const root = document.getElementById("root")
const cal = new Calendar()
root.innerHTML = cal.init()
cal.events()


//Státusz beállítása manuálisan
/*
cal.userId ="Béla"
cal.setDateStatus({date:"dátum", status:"Pihi"})
*/