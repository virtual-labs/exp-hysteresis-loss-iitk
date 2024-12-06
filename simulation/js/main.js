//Your JavaScript goes in here
const needle = document.querySelector("#needle");
needle.addEventListener("click", function () {
  needle.setAttribute("transform", "translate(0,-125)");
  needle.style.transition = "transform 2s";

  document.getElementById("ammeter1").disabled = false;
});

const needle2 = document.querySelector("#needle2");
needle2.addEventListener("click", function () {
  needle2.setAttribute("transform", "translate(0,-125)");
  needle2.style.transition = "transform 2s";

  document.getElementById("ammeter1").disabled = false;
});

const switchon = document.querySelector("#switchon");
switchon.addEventListener("click", function () {
  switchon.setAttribute("transform", "translate(0,30)");
  switchon.style.transition = "transform 2s";
  document.getElementById("color").style.fill = "green";
  document.getElementById("color").style.transition = "transform 2s";
  console.log("switchon");
  // document.getElementById("ammeter1").disabled = false;
});
function switchoff() {
  const switchoff = document.querySelector("#switchon");
  switchoff.setAttribute("transform", "translate(0,-5)");
  switchoff.style.transition = "transform 2s";
  document.getElementById("color").style.fill = "white";
  document.getElementById("color").style.transition = "transform 2s";
}
function changecolor() {
  document.getElementById("circle1").style.fill = "green";
  document.getElementById("circle2").style.fill = "green"; console.log("circle");
}

document.addEventListener("DOMContentLoaded", function () {
  const resistanceSlider = document.getElementById("resistance");
  const resistanceValue = document.getElementById("resistanceValue");
  const resultsTableBody = document.getElementById("resultsTableBody");
  const startButton = document.getElementById("startSimulation");
  const finalResult = document.getElementById("finalResult");
  const finalEnergyLoss = document.getElementById("finalEnergyLoss");

  let sensitivity = 1; // Sensitivity in arbitrary units
  let area = 0.005; // Area in m²
  let frequency = 50; // Frequency in Hz
  let connectionsComplete = false; // Track if connections are done
  let finalLoss = 0;

  // Open and close procedure panel
  window.openNav = function () {
      document.getElementById("mySidepanel").style.width = "350px";
  };

  window.closeNav = function () {
      document.getElementById("mySidepanel").style.width = "0";
  };

  // Function to calculate energy loss
  function calculateEnergyLoss(resistance) {
      const k = 0.1; // Constant
      return (k * resistance * sensitivity * area * frequency).toFixed(2);
  }

  // Function to update results table
  function updateResultsTable(resistance) {
      const energyLoss = calculateEnergyLoss(resistance);
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
          <td>${resultsTableBody.rows.length + 1}</td>
          <td>${resistance} Ω</td>
          <td>${sensitivity}</td>
          <td>${area.toFixed(4)} m²</td>
          <td>${energyLoss} J/s/m³</td>
      `;
      resultsTableBody.appendChild(newRow);
      finalLoss = energyLoss; // Store final loss for the result
  }

  // Function to simulate connections
  function completeConnections() {
      connectionsComplete = true;
      startButton.classList.remove("hidden"); // Show Start button
      alert("Connections completed. Now adjust the resistance and start the simulation.");
  }

  // Add event listener to Resistance Slider
  resistanceSlider.addEventListener("input", function () {
      const resistance = parseFloat(resistanceSlider.value);
      resistanceValue.textContent = resistance;

      // Only allow table updates if connections are complete
      if (connectionsComplete) {
          updateResultsTable(resistance);
      }
  });

  // Start Simulation Button
  startButton.addEventListener("click", function () {
      if (resultsTableBody.rows.length > 0) {
          finalResult.classList.remove("hidden"); // Show final result
          finalEnergyLoss.textContent = `${finalLoss}`;
      } else {
          alert("Adjust the resistance slider to generate results before starting the simulation.");
      }
  });

  // Simulate a connection click
  document.body.addEventListener("click", function (event) {
      if (event.target.matches("#needle, #switchon")) {
          completeConnections();
      }
  });
});
