chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
	tags = [];
	if(selection[0] !== "") {
		document.getElementById("output").value = "Loading summary, please wait..."
		document.getElementById("output").innerHTML = "Loading summary, please wait..."
		axios.post('https://kqotrompeg.execute-api.us-west-1.amazonaws.com/ver1', {input_data : selection[0], length: 50, tags: tags})
		.then((res) => {
			let r = JSON.parse(res.data.body);
			document.getElementById("output").innerHTML = res.data.body;
			document.getElementById("output").value = res.data.body;
		})
		.catch((err) => {
			document.getElementById("output").innerHTML = err;
		});
	} else {
		document.getElementById("output").value = "Select some text to generate the summary."
		document.getElementById("output").innerHTML = "Select some text to generate the summary."
	}
});

function copyToClipboard(elementID) {
  // Create a "hidden" input
  var aux = document.createElement("input");

  // Assign it the value of the specified element
  aux.setAttribute("value", document.getElementById(elementID).innerHTML);

  // Append it to the body
  document.body.appendChild(aux);

  // Highlight its content
  aux.select();

  // Copy the highlighted text
  document.execCommand("copy");

  // Remove it from the body
  document.body.removeChild(aux);
  alert('Summary Copied to Clipboard');
}

function redirectNewTab() {
	var newURL = "https://master.d1vwpnxehcamdn.amplifyapp.com/";
	chrome.tabs.create({ url: newURL });
}

document.getElementById('copysummary').addEventListener('click', function() {
	copyToClipboard('output');
});

document.getElementById('redirect').addEventListener('click', function() {
	redirectNewTab();
});

