const minusButton = document.getElementById('minus');
        const plusButton = document.getElementById('plus');
        const inputField = document.getElementById('input');

        const DieselminusButton = document.getElementById('Dieselminus');
        const DieselplusButton = document.getElementById('Dieselplus');
        const DieselinputField = document.getElementById('Dieselinput');

        let DieselPrice = 100;
        let PetrolPrice = 100;

        let PertolSumPrice = 0;
        let DieselSumPrice = 0;

        let NoDiesel = 0;
        let NoPetrol = 0;


        let Petrol = 0;
        let Diesel = 0;

        let AddedfuelPetrol = 0;
        let AddedfuelDiesel = 0;

        let AllMoney = 0;
        let TotalPrice = 0;

        TotalPrice = TotalPrice || 0;
        
        function Checker(){

        if (NoDiesel == 0) {
            document.getElementById("DieselBox").style.display = "none";
        }
        if (NoPetrol == 0) {
            document.getElementById("PetrolBox").style.display = "none";
        }
        if (NoPetrol == 0 && NoDiesel == 0) {
            document.getElementById("PopBoxConteiner").style.display = "none";
        }
       }
        document.getElementById("PetrolCost").innerHTML = PetrolPrice;
        document.getElementById("DieselCost").innerHTML = DieselPrice;
        document.getElementById("PetrolCostpop").innerHTML = PetrolPrice;
        document.getElementById("DieselCostpop").innerHTML = DieselPrice;




        minusButton.addEventListener('click', event => {
            event.preventDefault();
            const currentValue = Number(inputField.value) || 0;
            if (currentValue == undefined) {
                inputField.value = 0
            }
            console.log(currentValue);
            inputField.value = currentValue - 1;

            NoPetrol = inputField.value;
            document.getElementById("NoPetrol").innerHTML = NoPetrol;

            if (inputField.value < "0") {
                inputField.value = currentValue;
                Invisible();
            } else {
                console.log(inputField.value);
                Visible();
            }
            PetrolSum(NoPetrol);
        });


        plusButton.addEventListener('click', event => {
            event.preventDefault();
            const currentValue = Number(inputField.value) || 0;
            inputField.value = currentValue + 1;

            NoPetrol = inputField.value;
            document.getElementById("NoPetrol").innerHTML = NoPetrol;

            if (inputField.value > "0") {
                Visible();
            }
            PetrolSum(NoPetrol);
        });


        DieselminusButton.addEventListener('click', event => {
            event.preventDefault();
            const DieselcurrentValue = Number(DieselinputField.value) || 0;
            DieselinputField.value = DieselcurrentValue - 1;

            NoDiesel = DieselinputField.value;
            document.getElementById("NoDiesel").innerHTML = NoDiesel;


            if (DieselinputField.value < "0") {
                DieselinputField.value = DieselcurrentValue; //change here
                DieselInvisible();
            } else {
                console.log(DieselinputField.value);
                DieselVisible();
            }
            DieselSum(NoDiesel);
        });



        DieselplusButton.addEventListener('click', event => {
            event.preventDefault();
            const DieselcurrentValue = Number(DieselinputField.value) || 0;
            DieselinputField.value = DieselcurrentValue + 1;
            NoDiesel = DieselinputField.value;
            document.getElementById("NoDiesel").innerHTML = NoDiesel;

            if (DieselinputField.value > "0") {
                DieselVisible();
            }

            DieselSum(NoDiesel);
        });

        function Invisible() {
            document.getElementById("minus").style.visibility = "hidden";
        }

        function Visible() {
            document.getElementById("minus").style.visibility = "visible";
        }

        function DieselInvisible() {
            document.getElementById("Dieselminus").style.visibility = "hidden";
        }

        function DieselVisible() {
            document.getElementById("Dieselminus").style.visibility = "visible";
        }

        function PetrolSum(NoPetrol) {


            if (NoPetrol > 0) {
                PertolSumPrice = Number(PetrolPrice) * Number(NoPetrol);
                AddedfuelPetrol = TotalPrice + PertolSumPrice;

                document.getElementById("PertolSumPrice").innerHTML = PertolSumPrice;
                document.getElementById("PetrolBox").style.display = "flex";

            } else {
                document.getElementById("PetrolBox").style.display = "none";
                AddedfuelPetrol = 0;

            }
            if (NoPetrol == 0) {
                AddedfuelDiesel = 0;
            }
            con();

        }

        function DieselSum(NoDiesel) {

            if (NoDiesel > 0) {
                DieselSumPrice = Number(DieselPrice) * Number(NoDiesel);
                AddedfuelDiesel = TotalPrice + DieselSumPrice;
                document.getElementById("DieselSumPrice").innerHTML = DieselSumPrice;
                document.getElementById("DieselBox").style.display = "flex";
            } else {
                document.getElementById("DieselBox").style.display = "none";
                AddedfuelDiesel = 0;
            }
            if (NoDiesel == 0) {
                AddedfuelDiesel = 0;
            }
            con();

        }

        function con() {
            console.log(AddedfuelDiesel + "Diesel");
            console.log(AddedfuelPetrol + "Petrol");
            AllMoney = AddedfuelDiesel + AddedfuelPetrol;
            console.log(AllMoney);
            document.getElementById("TotalPrice").innerHTML = AllMoney;
        }



        $(document).ready(function () {
            $(".Next").click(function () {
                $("#PopBoxConteiner").slideUp();
                $("#PopBoxConteiner").css("display", "flex");
                Checker();
            });
            $("#backgroundOverlay").click(function () {
                $("#PopBoxConteiner").slideDown();
                $("#PopBoxConteiner").css("display", "none");
                Checker();
            });
            $("#Close").click(function () {
                $("#PopBoxConteiner").slideDown();
                $("#PopBoxConteiner").css("display", "none");

            });
            $(".LocationLink").click(function () {
                $("#Map").css("display", "Flex");
                getlocation();
                Checker();
            });
            $("#CloseMap").click(function () {
                $("#Map").css("display", "none");
                Checker();
            });
        });

     function getlocation() {
     if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showLoc, errHand);
     }
     }
     
     function showLoc(pos) {
     latt = pos.coords.latitude;
     long = pos.coords.longitude;
     var lattlong = new google.maps.LatLng(latt, long);
     var OPTions = {
      center: lattlong,
      zoom: 10,
      mapTypeControl: true,
      navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL,
      },
     };
     var mapg = new google.maps.Map(
      document.getElementById("demo2"),
      OPTions
     );
     var markerg = new google.maps.Marker({
      position: lattlong,
      map: mapg,
      title: "You are here!",
     });
     }
     
     function errHand(err) {
     switch (err.code) {
      case err.PERMISSION_DENIED:
      result.innerHTML =
       "The application doesn't have the permission" +
       "to make use of location services";
      break;
      case err.POSITION_UNAVAILABLE:
      result.innerHTML = "The location of the device is uncertain";
      break;
      case err.TIMEOUT:
      result.innerHTML = "The request to get user location timed out";
      break;
      case err.UNKNOWN_ERROR:
      result.innerHTML =
       "Time to fetch location information exceeded" +
       "the maximum timeout interval";
      break;
     }
     }