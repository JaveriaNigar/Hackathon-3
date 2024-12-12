"use strict";
class ResumeBuilder {
    constructor() {
        this.data = {
            name: '',
            email: '',
            contact: '',
            city: '',
            profilePicture: '',
            educationList: [],
            skillsList: [],
            workExperienceList: []
        };
    }
    // Store personal data
    storePersonalData(id, value) {
        switch (id) {
            case 'name':
                this.data.name = value;
                break;
            case 'email':
                this.data.email = value;
                break;
            case 'contact':
                this.data.contact = value;
                break;
            case 'city':
                this.data.city = value;
                break;
        }
    }
    // Store profile picture
    storeProfilePicture(file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            this.data.profilePicture = reader.result;
        };
        reader.readAsDataURL(file);
    }
    // Store comma-separated values for education, skills, work experience
    storeListData(id, value) {
        const values = value.split(',').map((item) => item.trim()); // Split and trim values
        switch (id) {
            case 'education':
                this.data.educationList = values;
                break;
            case 'skills':
                this.data.skillsList = values;
                break;
            case 'work-experience':
                this.data.workExperienceList = values;
                break;
        }
    }
    // Generate resume preview
    generateResumePreview() {
        const resumeOutput = document.getElementById('resume-output');
        if (resumeOutput) {
            const previewHtml = `
                <div class="resume-content">
                    <h2>Resume Preview</h2>
                    <h2>Personal Data</h2>
                    <p><strong>Name:</strong> ${this.data.name}</p>
                    <p><strong>Email:</strong> ${this.data.email}</p>
                    <p><strong>Contact:</strong> ${this.data.contact}</p>
                    <p><strong>City:</strong> ${this.data.city}</p>
                    <h2>Education</h2>
                    <ul>${this.data.educationList.map(item => `<li>${item}</li>`).join('')}</ul>
                    <h2>Skills</h2>
                    <ul>${this.data.skillsList.map(item => `<li>${item}</li>`).join('')}</ul>
                    <h2>Work Experience</h2>
                    <ul>${this.data.workExperienceList.map(item => `<li>${item}</li>`).join('')}</ul>
                </div>
                <div id="profile-picture-container">
                    <img id="profile-picture-preview" src="${this.data.profilePicture}" alt="Profile Picture"/>
                </div>
            `;
            resumeOutput.innerHTML = previewHtml;
        }
    }
}
// Initialize the ResumeBuilder class
const resumeBuilder = new ResumeBuilder();
document.addEventListener('DOMContentLoaded', () => {
    // Capture personal information input fields
    const personalInputs = document.querySelectorAll('#form-part input');
    personalInputs.forEach((input) => {
        input.addEventListener('input', (event) => {
            const target = event.target;
            resumeBuilder.storePersonalData(target.id, target.value);
        });
    });
    // Capture file input for profile picture
    const profilePictureInput = document.getElementById('profile-picture');
    profilePictureInput.addEventListener('change', (event) => {
        const target = event.target;
        if (target.files && target.files[0]) {
            resumeBuilder.storeProfilePicture(target.files[0]);
        }
    });
    // Capture comma-separated lists for education, skills, work experience
    const educationInput = document.getElementById('education');
    const skillsInput = document.getElementById('skills');
    const workExperienceInput = document.getElementById('work-experience');
    educationInput.addEventListener('input', (event) => {
        resumeBuilder.storeListData('education', educationInput.value);
    });
    skillsInput.addEventListener('input', (event) => {
        resumeBuilder.storeListData('skills', skillsInput.value);
    });
    workExperienceInput.addEventListener('input', (event) => {
        resumeBuilder.storeListData('work-experience', workExperienceInput.value);
    });
    // Add event listener to the Submit button to generate the resume preview
    const submitButton = document.getElementById('submit');
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', () => {
        resumeBuilder.generateResumePreview();
    });
});
