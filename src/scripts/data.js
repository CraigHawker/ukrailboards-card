import { normalizeCarriagesForService } from "../shared/normalize-carriages.js";

if (typeof registerHandlebarsHelpers === "function") {
    registerHandlebarsHelpers();
}

// Compile our templates or use precompiled templates supplied by the demo bundle.
var layoutTemplate;
var themeTemplate;
var boardTemplate;

if (window.boardTemplates) {
    layoutTemplate = window.boardTemplates.layoutTemplate;
    themeTemplate = window.boardTemplates.themeTemplate;
    boardTemplate = window.boardTemplates.boardTemplate;
} else {
    layoutTemplate = Handlebars.compile(document.getElementById("template-layout").innerHTML);
    themeTemplate = Handlebars.compile(document.getElementById("template-theme").innerHTML);
    boardTemplate = Handlebars.compile(document.getElementById("template-board").innerHTML);
}

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
        css: "table",
        name: "Table"
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
var boardData = getTrainData();

// Normalize carriage data onto each service so the template can render it.
if (boardData && Array.isArray(boardData.trainServices)) {
    boardData.trainServices = boardData.trainServices.map(function(service) {
        return Object.assign({}, service, {
            carriages: normalizeCarriagesForService(service, boardData)
        });
    });
}

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
            maxRows: 9,
            board: boardData
        };
        finalOutput += boardTemplate(data);
    }
}

// Output the final HTML.
document.getElementById("boards").innerHTML = finalOutput;

document.dispatchEvent(new CustomEvent("boards:rendered"));

// Let's create a function for the train data so it's out the way at the bottom of the page.
function getTrainData(){
    return {
    "trainServices": [
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Stratford International",
                            "crs": "SFA",
                            "st": "20:47",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Ebbsfleet International",
                            "crs": "EBD",
                            "st": "20:58",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Ashford International",
                            "crs": "AFK",
                            "st": "21:18",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Canterbury West",
                            "crs": "CBW",
                            "st": "21:34",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Thanet Parkway",
                            "crs": "THP",
                            "st": "21:52",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Ramsgate",
                            "crs": "RAM",
                            "st": "21:58",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Broadstairs",
                            "crs": "BSR",
                            "st": "22:04",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Margate",
                            "crs": "MAR",
                            "st": "22:10",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "formation": {
                "coaches": [
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "InService",
                            "Value": "Accessible"
                        },
                        "loadingSpecified": false,
                        "number": "A1"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A2"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A3"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A4"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A5"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "InService",
                            "Value": "Standard"
                        },
                        "loadingSpecified": false,
                        "number": "A6"
                    }
                ]
            },
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
                    "locationName": "Margate",
                    "crs": "MAR",
                    "via": "via Canterbury West",
                    "assocIsCancelled": false
                }
            ],
            "rsid": "SE846400",
            "std": "20:40",
            "etd": "On time",
            "platform": "12",
            "operator": "Southeastern",
            "operatorCode": "SE",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 6,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1703784STPANCI_"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Stratford International",
                            "crs": "SFA",
                            "st": "21:14",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Ebbsfleet International",
                            "crs": "EBD",
                            "st": "21:25",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Ashford International",
                            "crs": "AFK",
                            "st": "21:45",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Folkestone West",
                            "crs": "FKW",
                            "st": "21:59",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Folkestone Central",
                            "crs": "FKC",
                            "st": "22:02",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Dover Priory",
                            "crs": "DVP",
                            "st": "22:13",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Martin Mill",
                            "crs": "MTM",
                            "st": "22:22",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Walmer",
                            "crs": "WAM",
                            "st": "22:27",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Deal",
                            "crs": "DEA",
                            "st": "22:31",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Sandwich",
                            "crs": "SDW",
                            "st": "22:38",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "formation": {
                "coaches": [
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "InService",
                            "Value": "Accessible"
                        },
                        "loadingSpecified": false,
                        "number": "A1"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A2"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A3"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A4"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A5"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "InService",
                            "Value": "Standard"
                        },
                        "loadingSpecified": false,
                        "number": "A6"
                    }
                ]
            },
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
                    "locationName": "Sandwich",
                    "crs": "SDW",
                    "assocIsCancelled": false
                }
            ],
            "std": "21:07",
            "etd": "On time",
            "operator": "Southeastern",
            "operatorCode": "SE",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 6,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1709732STPANCI_"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Stratford International",
                            "crs": "SFA",
                            "st": "21:27",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Ebbsfleet International",
                            "crs": "EBD",
                            "st": "21:38",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Gravesend",
                            "crs": "GRV",
                            "st": "21:43",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Strood",
                            "crs": "SOO",
                            "st": "21:53",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Rochester",
                            "crs": "RTR",
                            "st": "21:57",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Chatham",
                            "crs": "CTM",
                            "st": "22:00",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Gillingham (Kent)",
                            "crs": "GLM",
                            "st": "22:05",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Rainham (Kent)",
                            "crs": "RAI",
                            "st": "22:10",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Sittingbourne",
                            "crs": "SIT",
                            "st": "22:18",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Faversham",
                            "crs": "FAV",
                            "st": "22:30",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Whitstable",
                            "crs": "WHI",
                            "st": "22:39",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Herne Bay",
                            "crs": "HNB",
                            "st": "22:45",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Birchington-on-Sea",
                            "crs": "BCH",
                            "st": "22:54",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Margate",
                            "crs": "MAR",
                            "st": "22:59",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Broadstairs",
                            "crs": "BSR",
                            "st": "23:05",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Ramsgate",
                            "crs": "RAM",
                            "st": "23:11",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "formation": {
                "coaches": [
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "InService",
                            "Value": "Accessible"
                        },
                        "loadingSpecified": false,
                        "number": "A1"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A2"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A3"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A4"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A5"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "InService",
                            "Value": "Standard"
                        },
                        "loadingSpecified": false,
                        "number": "A6"
                    }
                ]
            },
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
                    "locationName": "Ramsgate",
                    "crs": "RAM",
                    "via": "via Faversham",
                    "assocIsCancelled": false
                }
            ],
            "std": "21:20",
            "etd": "On time",
            "operator": "Southeastern",
            "operatorCode": "SE",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 6,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1709887STPANCI_"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Stratford International",
                            "crs": "SFA",
                            "st": "21:47",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Ebbsfleet International",
                            "crs": "EBD",
                            "st": "21:58",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Ashford International",
                            "crs": "AFK",
                            "st": "22:18",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Canterbury West",
                            "crs": "CBW",
                            "st": "22:34",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Thanet Parkway",
                            "crs": "THP",
                            "st": "22:52",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Ramsgate",
                            "crs": "RAM",
                            "st": "22:58",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Broadstairs",
                            "crs": "BSR",
                            "st": "23:04",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Margate",
                            "crs": "MAR",
                            "st": "23:10",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "formation": {
                "coaches": [
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "InService",
                            "Value": "Accessible"
                        },
                        "loadingSpecified": false,
                        "number": "A1"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A2"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A3"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A4"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A5"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "InService",
                            "Value": "Standard"
                        },
                        "loadingSpecified": false,
                        "number": "A6"
                    }
                ]
            },
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
                    "locationName": "Margate",
                    "crs": "MAR",
                    "via": "via Canterbury West",
                    "assocIsCancelled": false
                }
            ],
            "rsid": "SE846800",
            "std": "21:40",
            "etd": "On time",
            "operator": "Southeastern",
            "operatorCode": "SE",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 6,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1709791STPANCI_"
        },
        {
            "subsequentCallingPoints": [
                {
                    "callingPoint": [
                        {
                            "locationName": "Stratford International",
                            "crs": "SFA",
                            "st": "22:14",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Ebbsfleet International",
                            "crs": "EBD",
                            "st": "22:25",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Ashford International",
                            "crs": "AFK",
                            "st": "22:45",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Folkestone West",
                            "crs": "FKW",
                            "st": "22:59",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Folkestone Central",
                            "crs": "FKC",
                            "st": "23:02",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Dover Priory",
                            "crs": "DVP",
                            "st": "23:13",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Martin Mill",
                            "crs": "MTM",
                            "st": "23:22",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Walmer",
                            "crs": "WAM",
                            "st": "23:27",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Deal",
                            "crs": "DEA",
                            "st": "23:31",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        },
                        {
                            "locationName": "Sandwich",
                            "crs": "SDW",
                            "st": "23:37",
                            "et": "On time",
                            "isCancelled": false,
                            "length": 6,
                            "detachFront": false,
                            "formation": {
                                "coaches": [
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Accessible"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A1"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A2"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A3"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A4"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "Unknown",
                                            "Value": "None"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A5"
                                    },
                                    {
                                        "coachClass": "Standard",
                                        "toilet": {
                                            "status": "InService",
                                            "Value": "Standard"
                                        },
                                        "loadingSpecified": false,
                                        "number": "A6"
                                    }
                                ]
                            },
                            "affectedByDiversion": false,
                            "rerouteDelay": 0
                        }
                    ],
                    "serviceType": "train",
                    "serviceChangeRequired": false,
                    "assocIsCancelled": false
                }
            ],
            "formation": {
                "coaches": [
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "InService",
                            "Value": "Accessible"
                        },
                        "loadingSpecified": false,
                        "number": "A1"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A2"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A3"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A4"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "Unknown",
                            "Value": "None"
                        },
                        "loadingSpecified": false,
                        "number": "A5"
                    },
                    {
                        "coachClass": "Standard",
                        "toilet": {
                            "status": "InService",
                            "Value": "Standard"
                        },
                        "loadingSpecified": false,
                        "number": "A6"
                    }
                ]
            },
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
                    "locationName": "Sandwich",
                    "crs": "SDW",
                    "assocIsCancelled": false
                }
            ],
            "rsid": "SE867000",
            "std": "22:07",
            "etd": "On time",
            "operator": "Southeastern",
            "operatorCode": "SE",
            "isCircularRoute": false,
            "isCancelled": false,
            "filterLocationCancelled": false,
            "serviceType": "train",
            "length": 6,
            "detachFront": false,
            "isReverseFormation": false,
            "serviceID": "1709729STPANCI_"
        }
    ],
    "Xmlns": {
        "Count": 8
    },
    "generatedAt": "2026-03-31T20:28:47.5819549+01:00",
    "locationName": "London St Pancras (Intl)",
    "crs": "STP",
    "filterLocationName": "Ramsgate",
    "filtercrs": "RAM",
    "filterType": "to",
    "nrccMessages": [
        {
            "Value": "\nThere is currently reduced escalator access between platform B and the mezzanine at London St Pancras International station."
        }
    ],
    "platformAvailable": true,
    "areServicesAvailable": true
}
}