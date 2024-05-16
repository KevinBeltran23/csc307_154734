const handleLogin = () => {

    // Need to put both username and password to login
    if (!loginData.name || !loginData.password) {
      console.error("Username and password are required");
      setMessage("Username and password are required");
      return;
    }

    // Make an HTTP request to your backend function
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    })
    .then(response => {
      if (response.ok) {
        console.log("Login successful"); // Log success message
        navigate("/Monthly");
      } else {
        console.error("Login failed"); // Log failure message
      }
    })
    .catch(error => {
      console.error("Error:", error); // Log error message
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  /*
    loginUser(creds)
      .then(() => navigate("/monthly")) // Navigate to monthly page upon successful login
      .catch((error) => console.error("Login Error:", error));*/

      function loginUser(creds) {
        const promise = fetch(`${API_PREFIX}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(creds)
        })
          .then((response) => {
            if (response.status === 200) {
              response
                .json()
                .then((payload) => setToken(payload.token));
              setMessage(`Login successful; auth token saved`);
            } else {
              setMessage(
                `Login Error ${response.status}: ${response.data}`
              );
            }
          })
          .catch((error) => {
            setMessage(`Login Error: ${error}`);
          });
      
        return promise;
      }
