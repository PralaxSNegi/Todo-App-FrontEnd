import axios from "axios"
import { API_URL} from '../../Constants.js'

class HelloWorldService{

    executeHelloWorldService(){
        //console.log('HelloWorldService executed')
        return axios.get('http://localhost:8080/hello-world')
        
    }

    executeHelloWorldBeanService(){
        //console.log('HelloWorldService executed')
        return axios.get('http://localhost:8080/hello-world-bean')
        
    }

    executeHelloWorldPathVarialbleService(name){
        //console.log('HelloWorldService executed')
       let username = 'Pralax'
       let password = 'dummy'

        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

         return axios.get(`${API_URL}/hello-world/${name}`
        //  ,
        //     {
        //         headers: {
        //             authorization: basicAuthHeader
        //         }
        //     }
         )
        
    }

}

export default new HelloWorldService()