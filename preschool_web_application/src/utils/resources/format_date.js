function yyyymmddDateString(ddmmyyyyDate)
{
    var parts = ddmmyyyyDate.split("/");
    var day = parts[0];
    var month = parts[1];
    var year = parts[2];
    
    if(month.length === 1)
    {
        month = '0'+month
    }
    if(day.length === 1)
    {
        day = '0'+day
    }

    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
}

function ddmmyyyyDateString(yyyymmddDate)
{
    var parts = yyyymmddDate.split("-");
    var year = parts[0];
    var month = parts[1];
    var day = parts[2];
    
    if(month.length === 1)
    {
        month = '0'+month
    }
    if(day.length === 1)
    {
        day = '0'+day
    }

    var formattedDate = day + "/" + month + "/" + year;
    return formattedDate;
}

export { yyyymmddDateString, ddmmyyyyDateString}