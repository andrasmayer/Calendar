Element with root id needed for it. Can be changed at index.js (Man.... I'm lazy).

Module can be used by simply inserting <script type="module" src="index.js"></script> in your code.

Procedures available from outside:
- .download() you can set you backend's data source here (default is null)
- .upload() same as before  (both upload and download runs automaticly but you can call them whenever you want to sync)
- .setDateStatus({
                    date:date,      //   you wanna set
                    checked:bool    // true or false
                  })


  More details later.
  Happy hacking pirate.
