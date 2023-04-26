const body = document.body;
const containerEl = document.querySelector(".container");
const url = "http://localhost:3000";

let currentUser;
let currentRider = 0;

const nextbutton = document.querySelector("#nextrider");
nextbutton.addEventListener("click", () => {
  containerEl.innerHTML = "";
  currentRider++;
  getRiders();
});

const backbutton = document.querySelector("#previousrider");
backbutton.addEventListener("click", () => {
  containerEl.innerHTML = "";
  currentRider--;
  getRiders();
});

const accountsettings = document.querySelector("#accountsettings");
const submitbutton = document.querySelector("#submit");

submitbutton.addEventListener("click", () => {
  if (accountsettings.value === "deleteaccount") {
    let choice = prompt(
      `Are you sure you want to delete ${currentUser.name}'s account ?`
    );
    if (choice == "yes") {
      fetch(`${url}/api/rider_app/${currentUser.id}`, {
        method: "DELETE",
      }).then(() => {
        console.log(`${currentUser.name} was deleted.`);
        getRiders();
      });
    }
  } else if (accountsettings.value === "updateaccount") {
    fetch(`${url}/api/rider_app/${currentUser.id}`, { method: "PATCH" }).then(
      () => {
        containerEl.innerHTML = "";
        console.log(`${currentUser.name}'s account was updated`);
        createForm();
      }
    );
  }
});

let newUser = document.querySelector(".newaccount");
newUser.addEventListener("click", () => {
  console.log("clicked");
  containerEl.innerHTML = "";
  newAccount();
});

function newform() {
  let form = document.createElement("div");
  form.innerHTML = `
    <h1>Sign Up</h1>
    <div class="field">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" placeholder="Enter your first name"/>
      <small></small>
    </div>
    <div class="field">
      <label for="age">Age:</label>
      <input type="text" id="age" name="age" placeholder="Enter your age" />
      <small></small>
    </div>
    <div>
    <label for="brand">Motorcycle Brand:</label>
    <input type="text" id="brand" name="brand" placeholder="Enter the make of your motorcycle" />
    <small></small>
    </div>
    <div>
      <label for="enginesize">Engine Size:</label>
      <input type="text" id="enginesize" name="enginesize" placeholder="Enter the size of your engine" />
      <small></small>
    </div>
    <div>
    <label for="ridingstyle">Riding Style:</label>
    <input type="text" id="ridingstyle" name="ridingstyle" placeholder="Enter your riding style" />
    <small></small>
    </div>
    <div>
      <label for="bio">Bio:</label>
      <input type="text" id="bio" name="bio" placeholder="Enter your bio" />
      <small></small>
    </div>
    <button type="submit" id = "formsubmit">Submit</button>`;
  return form;
}
function createForm() {
  let $form = newform();
  let formTitle = $form.querySelector("h1");
  formTitle.innerText = "Update Account:";
  containerEl.append($form);
  let name = $form.querySelector("#name");
  let age = $form.querySelector("#age");
  let brand = $form.querySelector("#brand");
  let enginesize = $form.querySelector("#enginesize");
  let ridingstyle = $form.querySelector("#ridingstyle");
  let bio = $form.querySelector("#bio");

  let formsubmit = $form.querySelector("#formsubmit");
  formsubmit.addEventListener("click", () => {
    let data = {
      name: name.value,
      age: age.value,
      motorcycle_brand: brand.value,
      motorcycle_size: enginesize.value,
      riding_style: ridingstyle.value,
      biography: bio.value,
    };
    console.log(data);
    fetch(`${url}/api/rider_app/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        containerEl.innerHTML = "";
        getRiders();
      });
  });
}

function newAccount() {
  // new account form if create account is clicked
  let $form = newform();
  containerEl.append($form);
  let name = $form.querySelector("#name");
  let age = $form.querySelector("#age");
  let brand = $form.querySelector("#brand");
  let enginesize = $form.querySelector("#enginesize");
  let ridingstyle = $form.querySelector("#ridingstyle");
  let bio = $form.querySelector("#bio");

  let formsubmit = $form.querySelector("#formsubmit");
  formsubmit.addEventListener("click", () => {
    if (
      !name.value ||
      !age.value ||
      !brand.value ||
      !enginesize.value ||
      !ridingstyle.value ||
      !bio.value
    ) {
      alert("You must fill out all text fields to create an account on Rider");
      return;
    }
    let data = {
      name: name.value,
      age: age.value,
      motorcycle_brand: brand.value,
      motorcycle_size: enginesize.value,
      riding_style: ridingstyle.value,
      biography: bio.value,
    };
    console.log(data);
    fetch(`${url}/api/rider_app`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        containerEl.innerHTML = "";
        getRiders();
      });
  });
}

function getRiders() {
  fetch(`${url}/api/rider_app`)
    .then((res) => res.json())
    .then((riders) => {
      if (currentRider < 0) {
        currentRider = riders.length - 1;
      }
      containerEl.innerHTML += makeCard(riders[currentRider % riders.length]);
      currentUser = riders[currentRider % riders.length];
    });
}

getRiders();

function makeCard(rider) {
  return `<div class="riderprofile">
      <img class="photos" src="http://github.com/tpeterec.png" />
      <div class= "nameandage"><h2 class="name">${rider.name}</h2>
      <h2 class="age">${rider.age}</h2>
      </div>
      <h3 class="brand">Manufacturer: ${rider.motorcycle_brand}</h3>
      <h3 class="enginesize">Engine Size: ${rider.motorcycle_size}</h3>
      <h3 class="ridingstyle">Riding Style: ${rider.riding_style}</h3>
      <p class="bio"> Bio: ${rider.biography}</p>
    </div>`;
}
