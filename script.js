const deletePass = (website) => {
    let data = localStorage.getItem("passwords");
    if (data) {
        let arr = JSON.parse(data);
        let updatedArr = arr.filter(e => e.website !== website);
        localStorage.setItem("passwords", JSON.stringify(updatedArr));
        alert(`Deleted password for ${website}`);
        showPass();
    }
};

const showPass = () => {
    let tb = document.getElementById("passwordTable");
    let data = localStorage.getItem("passwords");
    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = `<tr><td colspan="4">No data to show</td></tr>`;
    } else {
        tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
        </tr>`;
        let arr = JSON.parse(data);
        let rows = "";
        arr.forEach(element => {
            rows += `<tr>
                <td>${element.website} <img src="copy.svg" alt="Copy" onclick="copyToClipboard('${element.website}')" width="12"></td>
                <td>${element.username} <img src="copy.svg" alt="Copy" onclick="copyToClipboard('${element.username}')" width="12"></td>
                <td>${element.Password} <img src="copy.svg" alt="Copy" onclick="copyToClipboard('${element.Password}')" width="12"></td>
                <td><button class="btnsm" onclick="deletePass('${element.website}')">Delete</button></td>
            </tr>`;
        });
        tb.innerHTML += rows;
    }
};

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        alert(`Copied: ${text}`);
    });
};

document.getElementById("passwordForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let website = document.getElementById("website").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("Password").value;

    if (website && username && password) {
        let passwords = localStorage.getItem("passwords");
        let json = passwords ? JSON.parse(passwords) : [];
        json.push({ website, username, Password: password });
        localStorage.setItem("passwords", JSON.stringify(json));
        alert("Password saved!");
        showPass();
    } else {
        alert("Please fill out all fields.");
    }

    // Clear form
    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("Password").value = "";
});

showPass();
