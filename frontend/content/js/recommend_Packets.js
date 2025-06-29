window.addEventListener('load', () => {
    const recommendPacketsTable = document.querySelector('.recommend-packets-table');
    const recommendPacketsTableBody = recommendPacketsTable.querySelector('tbody');

    const mainUrlApi = 'http://localhost:3000/api';

    let userToken = localStorage.getItem('user-token');

    fetch(`${mainUrlApi}/recommend-packs`, {
        headers: {
            authorization: 'Bearer ' + userToken
        }
    })
        .then(res => res.json())
        .then(packets => {
            console.log("packets", packets)
            packets.forEach(packet => {
                recommendPacketsTable.insertAdjacentHTML('beforeend', `
                    <tr>
                    <td>${packet.max_date}</td>
                    <td>${packet.title}</td>
                    <td>${packet.off}%</td>
                    <td>${packet.price} تومان</td>
                    <td><button class="buy-packet-btn lalezar-font">
                        خرید
                    </button></td>
                </tr>
                `)
            });
        }
        )

})