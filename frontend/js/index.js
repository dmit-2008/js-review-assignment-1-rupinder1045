// your code goes here.
import 'bootstrap/dist/css/bootstrap.min.css';
import { jobSearch } from './api/jobs.js';
import { getJobDetails } from './api/jobs.js';


document.addEventListener('DOMContentLoaded', () => {
    const searchedJobsList = document.getElementById('searched-jobs');
    const searchJobsForm = document.getElementById('search-jobs-form');
    const jobDetailsCard = document.getElementById('job-details-card');


    function renderJobs(jobs) {
        searchedJobsList.innerHTML = '';
        if (jobs.length === 0) {
            searchedJobsList.innerHTML = '<div class="text-dark">No Results Found</div>';
            return;
        }
        jobs.forEach(job => {
            const jobCard = document.createElement('li');
            jobCard.className = 'job-card card my-1';
            jobCard.style.width = '18rem';
            jobCard.innerHTML = `
          <div class="card-header">${job.company}</div>
          <div class="card-body">
            <h5 class="card-title">${job.title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">${new Date(job.postedDate).toLocaleDateString()}</h6>
            <button class="btn btn-primary view-job-button" job-data-id="${job.id}">View Job</button>
          </div>
        `;
            searchedJobsList.appendChild(jobCard);
        });
    }

    searchJobsForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = event.target.elements['query'].value;
        const jobs = await jobSearch(query);
        renderJobs(jobs);
    });


    searchedJobsList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('view-job-button')) {
            const jobId = event.target.getAttribute('job-data-id');
            const job = await getJobDetails(jobId);
            if (job) {
                jobDetailsCard.innerHTML = `
            <div class="card">
              <div class="card-body">
                <h3 class="card-title">${job.title}</h3>
                <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${job.company}</h4>
                <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
                <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${new Date(job.postedDate).toLocaleDateString()}</h6>
                <h5 class="card-subtitle mb-2">Description</h5>
                <p class="card-text">${job.description}</p>
                <h5 class="card-subtitle mb-2">Qualifications</h5>
                <p class="card-text">${job.qualifications}</p>
                <button class="btn btn-success save-job">
                  Save Job
                </button>
              </div>
            </div>
          `;
            }
        }
    });


    async function loadAllJobs() {
        const jobs = await jobSearch('');
        renderJobs(jobs);
    }
    loadAllJobs();
});
