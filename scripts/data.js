// Compile our templates.
var layoutTemplate = Handlebars.compile(document.getElementById("template-layout").innerHTML);
var themeTemplate = Handlebars.compile(document.getElementById("template-theme").innerHTML);
var boardTemplate = Handlebars.compile(document.getElementById("template-board").innerHTML);

// Create themes and layouts arrays so we can output every combination.
var layouts = [
    {
        css: "overhead-platform",
        name: "Overhead platform"
    }, 
    {
        css: "single-train",
        name: "Single train"
    }, 
    {
        css: "responsive",
        name: "Responsive"
    }];
var themes = [{
    css: "",
    name: "Default"
}, {
    css: "theme-london2025",
    name: "London 2025"
}];

// Get the actual train data.
var trainData = getTrainData();

// Iterate over every combination of theme and layout and output a board for each.
var finalOutput = "";
for (var i = 0; i < layouts.length; i++) {
    // Render the layout template.
    finalOutput += layoutTemplate(layouts[i]);
    for (var j = 0; j < themes.length; j++) {
        // Render the theme template.
        finalOutput += themeTemplate(themes[j]);
        
        // Render the board template.
        var data = {
            layout: layouts[i],
            theme: themes[j],
            trains: trainData
        };
        finalOutput += boardTemplate(data);
    }
}

// Output the final HTML.
document.getElementById("boards").innerHTML = finalOutput;

// Let's create a function for the train data so it's out the way at the bottom of the page.
function getTrainData(){
    return {
    "trainServices": [
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "London St Pancras (Intl)",
                            "crs": "STP",
                            "st": "11:27",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 0,
                            "detachFront": false,
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
                {
                    "locationName": "Nottingham",
                    "crs": "NOT",
                    "assocIsCancelled": false
                }
            ],
            "destination": [
                {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "assocIsCancelled": false
                }
            ],
            "std": "10:41",
            "etd": "On time",
            "platform": "2",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1337298WLNGBRO1"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Bedford",
                            "crs": "BDM",
                            "st": "11:10",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Luton",
                            "crs": "LUT",
                            "st": "11:25",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Luton Airport Parkway",
                            "crs": "LTN",
                            "st": "11:28",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "London St Pancras (Intl)",
                            "crs": "STP",
                            "st": "11:52",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
                {
                    "locationName": "Corby",
                    "crs": "COR",
                    "assocIsCancelled": false
                }
            ],
            "destination": [
                {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "assocIsCancelled": false
                }
            ],
            "std": "10:57",
            "etd": "Cancelled",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": true,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
            "serviceID": "1337203WLNGBRO_"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Kettering",
                            "crs": "KET",
                            "st": "11:15",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Corby",
                            "crs": "COR",
                            "st": "11:25",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
                {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "assocIsCancelled": false
                }
            ],
            "destination": [
                {
                    "locationName": "Corby",
                    "crs": "COR",
                    "assocIsCancelled": false
                }
            ],
            "std": "11:07",
            "etd": "Cancelled",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": true,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
            "serviceID": "1337359WLNGBRO_"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Luton Airport Parkway",
                            "crs": "LTN",
                            "st": "11:34",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 0,
                            "detachFront": false,
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "London St Pancras (Intl)",
                            "crs": "STP",
                            "st": "11:55",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 0,
                            "detachFront": false,
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
                {
                    "locationName": "Nottingham",
                    "crs": "NOT",
                    "assocIsCancelled": false
                }
            ],
            "destination": [
                {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "assocIsCancelled": false
                }
            ],
            "rsid": "EM223400",
            "std": "11:12",
            "etd": "On time",
            "platform": "2",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1337259WLNGBRO1"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Kettering",
                            "crs": "KET",
                            "st": "11:21",
                            "et": "11:23",
                            "isCancelled": false,
                            "length": 0,
                            "detachFront": false,
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Market Harborough",
                            "crs": "MHR",
                            "st": "11:31",
                            "et": "11:33",
                            "isCancelled": false,
                            "length": 0,
                            "detachFront": false,
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Leicester",
                            "crs": "LEI",
                            "st": "11:45",
                            "et": "11:47",
                            "isCancelled": false,
                            "length": 0,
                            "detachFront": false,
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Nottingham",
                            "crs": "NOT",
                            "st": "12:09",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 0,
                            "detachFront": false,
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
                {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "assocIsCancelled": false
                }
            ],
            "destination": [
                {
                    "locationName": "Nottingham",
                    "crs": "NOT",
                    "assocIsCancelled": false
                }
            ],
            "std": "11:16",
            "etd": "11:19",
            "platform": "1",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1330820WLNGBRO1"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Bedford",
                            "crs": "BDM",
                            "st": "11:40",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Luton",
                            "crs": "LUT",
                            "st": "11:55",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Luton Airport Parkway",
                            "crs": "LTN",
                            "st": "11:58",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "London St Pancras (Intl)",
                            "crs": "STP",
                            "st": "12:22",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
                {
                    "locationName": "Corby",
                    "crs": "COR",
                    "assocIsCancelled": false
                }
            ],
            "destination": [
                {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "assocIsCancelled": false
                }
            ],
            "currentDestinations": [
                {
                    "locationName": "Kettering",
                    "crs": "KET",
                    "assocIsCancelled": false
                }
            ],
            "std": "11:27",
            "etd": "Cancelled",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": true,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
            "serviceID": "1337584WLNGBRO_"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Kettering",
                            "crs": "KET",
                            "st": "11:46",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 0,
                            "detachFront": false,
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Corby",
                            "crs": "COR",
                            "st": "11:54",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 0,
                            "detachFront": false,
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
                {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "assocIsCancelled": false
                }
            ],
            "destination": [
                {
                    "locationName": "Corby",
                    "crs": "COR",
                    "assocIsCancelled": false
                }
            ],
            "currentOrigins": [
                {
                    "locationName": "Kettering",
                    "crs": "KET",
                    "assocIsCancelled": false
                }
            ],
            "std": "11:37",
            "etd": "Cancelled",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": true,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
            "serviceID": "1337554WLNGBRO_"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "London St Pancras (Intl)",
                            "crs": "STP",
                            "st": "12:27",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 0,
                            "detachFront": false,
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
                {
                    "locationName": "Nottingham",
                    "crs": "NOT",
                    "assocIsCancelled": false
                }
            ],
            "destination": [
                {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "assocIsCancelled": false
                }
            ],
            "std": "11:42",
            "etd": "On time",
            "platform": "2",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1337093WLNGBRO1"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Bedford",
                            "crs": "BDM",
                            "st": "12:09",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Luton",
                            "crs": "LUT",
                            "st": "12:25",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Luton Airport Parkway",
                            "crs": "LTN",
                            "st": "12:28",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "London St Pancras (Intl)",
                            "crs": "STP",
                            "st": "12:51",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
                {
                    "locationName": "Corby",
                    "crs": "COR",
                    "assocIsCancelled": false
                }
            ],
            "destination": [
                {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "assocIsCancelled": false
                }
            ],
            "std": "11:56",
            "etd": "Cancelled",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": true,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
            "serviceID": "1337541WLNGBRO_"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Kettering",
                            "crs": "KET",
                            "st": "12:15",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Corby",
                            "crs": "COR",
                            "st": "12:24",
                            "et": "Cancelled",
                            "isCancelled": true,
                            "length": 0,
                            "detachFront": false,
                            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "futureCancellation": false,
            "futureDelay": false,
            "origin": [
                {
                    "locationName": "London St Pancras (Intl)",
                    "crs": "STP",
                    "assocIsCancelled": false
                }
            ],
            "destination": [
                {
                    "locationName": "Corby",
                    "crs": "COR",
                    "assocIsCancelled": false
                }
            ],
            "std": "12:07",
            "etd": "Cancelled",
            "operator": "East Midlands Railway",
            "operatorCode": "EM",
            "isCircularRoute": false,
            "isCancelled": true,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 0,
            "detachFront": false,
            "isReverseFormation": false,
            "cancelReason": "This service has been cancelled because of a fault with the signalling system",
            "serviceID": "1337650WLNGBRO_"
        }
    ],
    "Xmlns": {
        "Count": 8
    },
    "generatedAt": "2026-03-19T10:42:44.6047546+00:00",
    "locationName": "Wellingborough",
    "crs": "WEL",
    "filterType": "to",
    "nrccMessages": [
        {
            "Value": "\nEast Midlands Railway services to / from London St Pancras International may be cancelled, delayed by up to 50 minutes or revised. Latest information can be found in <a href=\"https://www.nationalrail.co.uk/service-disruptions/london-st-pancras-international-20260318/\">Status and Disruptions</a>."
        }
    ],
    "platformAvailable": true,
    "areServicesAvailable": true
};
}