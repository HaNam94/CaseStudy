class Student {
    constructor(id, fullName, dob, gender, className, avatar) {
        this.id = id;
        this.fullName = fullName;
        this.dob = dob;
        this.gender = gender;
        this.className = className;
        this.avatar = avatar;
    }

    render() {
        const studentList = document.getElementById("students");
        const studentItem = document.createElement("li");
        // studentItem.innerHTML = ""
        studentItem.innerHTML = `
      <p><strong>ID:</strong> <span class="student-id">${this.id}</span></p>
      <p><strong>Họ và tên:</strong> <span class="full-name">${this.fullName}</span></p>
      <p><strong>Ngày sinh:</strong> <span class="dob">${this.dob}</span></p>
      <p><strong>Giới tính:</strong> <span class="gender">${this.gender}</span></p>
      <p><strong>Lớp:</strong> <span class="class">${this.className}</span></p>
      <img src="${this.avatar}" alt="${this.fullName}">
      <div class="buttons">
        <button class="edit-btn">Chỉnh sửa</button>
        <button class="save-btn">Lưu</button>
        <button class="delete-btn">Xóa</button>
      </div>
    `;
        studentList.appendChild(studentItem);

        const deleteBtn = studentItem.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            studentList.removeChild(studentItem);
        });

        const editBtn = studentItem.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => {
            const id = studentItem.querySelector(".student-id").textContent;
            const fullName = studentItem.querySelector(".full-name").textContent;
            const dob = studentItem.querySelector(".dob").textContent;
            const gender = studentItem.querySelector(".gender").textContent;
            const className = studentItem.querySelector(".class").textContent;
            document.getElementById("student-id").value = id;
            document.getElementById("full-name").value = fullName;
            document.getElementById("dob").value = dob;
            document.getElementById("gender").value = gender;
            document.getElementById("class").value = className;
        });

        const saveBtn = studentItem.querySelector(".save-btn");
        saveBtn.addEventListener("click", () => {
            const id = studentItem.querySelector(".student-id").textContent;
            const fullName = document.getElementById("full-name").value;
            const dob = document.getElementById("dob").value;
            const gender = document.getElementById("gender").value;
            const className = document.getElementById("class").value;
            const avatar = document.getElementById("avatar").files[0];
            const updatedStudent = new Student(id, fullName, dob, gender, className, URL.createObjectURL(avatar));
            studentList.replaceChild(updatedStudent.render(), studentItem);
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const addBtn = document.getElementById("add-btn");
    const searchInput = document.getElementById("search");

    addBtn.addEventListener("click", function() {
        const id = document.getElementById("student-id").value;
        const fullName = document.getElementById("full-name").value;
        const dob = document.getElementById("dob").value;
        const gender = document.getElementById("gender").value;
        const className = document.getElementById("class").value;
        const avatar = document.getElementById("avatar").files[0];
        const student = new Student(id, fullName, dob, gender, className, URL.createObjectURL(avatar));
        student.render();
    });

    searchInput.addEventListener("keyup", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const students = document.getElementById("students").getElementsByTagName("li");
        for (let student of students) {
            const fullName = student.querySelector(".full-name").textContent.toLowerCase();
            student.style.display = fullName.includes(searchTerm) ? "block" : "none";
        }
    });
});
