var container = document.querySelector(".container");

container.addEventListener("click", function(event) {
  var element = event.target;
  // TODO: Complete function
  if (element.matches(".box")){
    var state = element.getAttribute("data-state");
    console.log(state)
    var number = element.getAttribute("data-number");
    console.log(number)
    if (state === "hidden") {
      element.setAttribute("data-state", "visible");
      element.textContent = number;
    } else {
      element.setAttribute("data-state", "hidden");
      element.textContent = "";
    }
  }

});