window.addEventListener('load', () => {
    const servicesTitle = $.querySelector('.service-title');

    fetch(`http://localhost:3000/api/services/1`)
        .then((res) => res.json())
        .then((services) => {
            console.log(services)
            services.forEach(service => {
                servicesTitle.insertAdjacentHTML('afterend',
                    `
                    <div class="active-service-box flex align-items-center vazir-fb">
                <span class="active-sevice-icon flex align-items-center justify-content-center">
                    <i class="${service.icon}"></i>
                </span>

                <div class="active-service-box-desc">
                    <h4>"${service.title}"</h4>
                    <h6>"${service.max_date}"</h6>
                </div>
            </div>
            `
                )
            });
        })
})