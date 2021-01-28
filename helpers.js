module.exports = {
    //Checks user types
    isCustomer: function(type){
        return type == 'customer'
    },

    isRestaurant: function(type){
        return type == 'restaurant'
    },

    getStreet : function(location){
        return location.split(", ")[0];
    },

    getCity : function(location){
        return location.split(", ")[1];
    },

    getOpen : function(time){
        return time.split(" - ")[0];
    },

    getClose : function(time){
        return time.split(" - ")[1];
    },

    contactLzero : function(contact){
        var contactno = contact.toString()
        if(contactno.length <11){
            while(contactno.length <11){
                contactno = "0" + contactno;
            }
        }
        return contactno;
    },

    getTime :function(time){
        mtime = time.split(" - ");
        var timee = "";
        for(var i = 0; i<2; i++){
           var hour = mtime[i].split(":")[0];
           var min = mtime[i].split(":")[1];
            if(hour > 0 && hour < 12){
                timee = timee + hour + ":" + min +"am";
            }
            else if(hour > 12){
                timee= timee+ (hour-12)+ ":"+min+"pm";
            }
            else if(hour == 0){
                timee = timee + "12:" +min+"am";
            }
            if(i == 0){
                timee = timee + " - ";
            }
        }
        return timee;
    }
}