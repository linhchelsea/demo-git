const axios = require('axios');
const prd = 'https://api-prod.everfit.io';

const { teams } = require('./teams');

let index = 5030;
const stopIndex = 7000;

const sleep = async (s) => {
    const ms = s * 1000;
    return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
    for (let i = index; i <= stopIndex; i += 1) {
        const teamId = teams[i]
        if (teamId) {
            try {
                const res = await axios.post(
                    `${prd}/api/system-task/migrate-exercise-author-populate-data`,
                    {
                        specificKey: `everfit:exercise-search-cache:team:exercise:${teamId}`,
                        isUpdate: true
                    },
                    {
                        headers: { secret: 'everfit!' }
                    }
                );
                console.log('Success: ', i, res.data);
            } catch (e) {
                console.log('Error : ', i);
                console.log(e);
            }
        }
        await sleep(3);
    }
})()