var axios = require('axios');

axios.get('https://pypi.org/pypi/django-simpleui/json').then(res=>{
    console.log(res.data)
})
