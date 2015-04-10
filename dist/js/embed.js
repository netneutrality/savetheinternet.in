/* global window, document */
/* jshint -W116 */


//-- A bunch of micro-frameworks from old Askabt code. Ensures things don't conflict with parent page libs. --

/*
  addEvent normalizes event behavior on IE. It's based on:
    Quirksmode AddEvent contest entry by John Resig,
    added the FixEvent functionality by Dean Edwards
	
  @author Aravind.
*/

function addEvent( elem, type, fn ) {
	if (elem.addEventListener)
		elem.addEventListener( type, fn, false );
	else if (elem.attachEvent) {
		elem.attachEvent( "on"+type, function() {
			return fn(addEvent.fixEvent(window.event));
		});
	}
}

addEvent.fixEvent = function(event) {
  // add W3C standard event methods
  event.preventDefault = addEvent.preventDefault;
  event.stopPropagation = addEvent.stopPropagation;
  return event;
};

addEvent.preventDefault = function() {
  this.returnValue = false;
};

addEvent.stopPropagation = function() {
  this.cancelBubble = true;
};

/*
  addStyle adds inline style blocks (formatted as JSON or strings) to elements.
  @author Aravind.
*/

var addStyle = function(elem, value) {
	if('object' === typeof value) {
		for(var cssName in value) if(value.hasOwnProperty(cssName)) {
			try { elem.style[cssName] = value[cssName]; }
			catch(e) { /* ignore, unsupported CSS property. */ }
		}
	} else if ('undefined' !== typeof elem.style.cssText) {
		elem.style.cssText = value;
	} else {
		elem.style = value;
	}
};

/*
  Element builds DOM elements from JsonML. See jsonml.org
  
  Highly stripped out version of the official JSONML parser, removing
  support for obsolete browsers, seldom-used HTML tags and for correcting
  common mistakes. 
  
  @author aravind
*/

function Element (jml) {
  try {
    if (!jml) return null;
    if ('string' === typeof jml) return document.createTextNode(jml);
    
    if (!(jml instanceof Array) || 'string' !== typeof jml[0]) throw new SyntaxError('Invalid JsonML');

    var elem = document.createElement(jml[0]);
    
    for (var i=1; i<jml.length; i++) {
      if (jml[i] instanceof Array || 'string' === typeof jml[i]) {     // child node
          elem.appendChild( Element(jml[i]) );
      } else if ('object' === typeof jml[i] && jml[i] !== null) {      // attributes object
        for (var name in jml[i]) {
          var value = jml[i][name];
          if (value === null || 'undefined' === typeof value) continue;
          
          if (name === 'style') {                                      // inline style
              addStyle(elem, value);
          } else if (name === 'class') {                               // className
              elem.className = value;
          } else if ('function' === typeof value) {                    // event handler
            addEvent(elem, name, value);
          } else if ('string' === typeof value || 'number' === typeof value || 'boolean' === typeof value) {
            elem.setAttribute(name, value);                            // ordinary attribute
          } else {
            elem[name] = value;                                        // something else
          }
		}
      }
    }
    return elem;
    
  } catch (ex) {
      console.log(ex);
      throw new SyntaxError('Invalid JsonML');
  }
}

/*
  DomReady executes the callback when DOM is (or has been) loaded.
  
  @author aravind
*/

function DomReady(fn) {
  if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn, false);
  }
}

//-- The embed itself is here. ---

if(!/\binternet-defense-modal=dismissed\b/.test(document.cookie)) DomReady(function () {
  function dismiss() {
    document.cookie = "internet-defense-modal=dismissed;";
    document.body.removeChild(el);
  }
  
  var el = Element(["div", { className: "internet-defense-modal",
      style: {
        position: "absolute",
        top: "25%", left: "25%",
        width: "50%",
        boxSizing: "border-box",
        fontSize: "16px",
        fontWeight: "normal",
        background: "#fff",
        color: "#333",
        padding: "48px 48px",
        borderRadius: "4px",
        boxShadow: "0 0 600px 600px rgba(0,0,0,0.75)",
        zIndex: 99999
      }
    },
    ["button", { className: "internet-defense-modal-closebtn",
        style: {
          position: "absolute",
          top: 0, right: 0,
          padding: "0 20px",
          height: "48px",
          cursor: "pointer",
          background: "transparent",
          border: "none"
        },
        click: dismiss
      },
      "Close this message ×"
    ],
    ["h1", { className: "internet-defense-modal-head",
        style: {
          padding: 0, margin: 0, marginBottom: "16px",
          fontSize: "32px",
          fontWeight: "normal"
        }
      },
      "Upgrade your internet plan to view this website"
    ],
    ["p", 'Okay, You may close this and continue browsing for now. ', ["strong", 'But not for long.']],
    ["p", 'Big ISPs want to block many popular apps and websites and charge us extra for using them. ',
      'They are lobbying the government incessantly to let them do this, ',
      ["strong", 'and it might be decided as early as 24 April! '],
    ],
    ["p", 'We can stop this by sending a loud and clear message to the government: ',
      ['b', 'We want ISPs to be held to strong Net Neutrality standards.']
    ],
    ["p", 'Take two minutes, send an email and help protect the open internet in India.'],
    ["a", { className: "internet-defense-modal-actionbtn",
        href: "http://netneutrality.in",
        target: "_blank",
        style: {
          display: "block",
          padding: "24px 32px",
          width: "75%",
          margin: "32px auto 0 auto",
          background: "#39f",
          color: "#fff",
          textAlign: "left",
          textDecoration: "none",
          border: "none",
          borderRadius: "4px",
          boxShadow: "0 2px 4px 0 rgba(0,0,0,0.5)"
        },
        click: dismiss
      },
      ["div",
        { style: { fontSize: "20px", fontWeight: "bold" }},
        "Defend the internet ➔",
      ],
     ["div", {style: {color: "#069"}}, "Learn more about net neutrality" ],
     ["div", {style: {color: "#069"}}, "Send your views to the TRAI" ],
    ],
     ["div", {style: {textAlign: "center", color: "#999"}}, "Opens in a new window" ]
    
  ]);
  
  document.body.insertBefore(el, document.body.firstChild);
});



// })();