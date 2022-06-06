# verify-code

## 安装依赖
```
npm install verify-img-code
```
## 适用环境 (Vue)
vite 
对 webpack 的支持有一定局限，若报错，不要惊慌，换 vite

## 使用方法
```js
模板中：
<VerifyCode ref="verifyRef"></VerifyCode>

js 中：
import { VerifyCode } from 'verify-img-code'
```

## 场景实例
登录注册
```js
const username = ref('')
const password = ref('')
const verify = ref('')
let T = ref('login')
const verifyRef = ref(null)     // 验证码这个子组件
const title = ref('登录')

const onSubmit = async() => {
    if (T.value === 'login') {
        // console.log(verifyRef.value.imgCode);       // 验证码
        const {data} = await axios.post('/user/login', {
            username: username.value,
            password: password.value
        })
        Toast.success('登陆成功');
        localStorage.setItem('token',data.token)
        router.push('/home')

    }else {
        if (verify.value != verifyRef.value.imgCode) {
            Toast.fail('验证码错误！');
            return
        }
        // 发请求
        const {data} = await axios.post('/user/register', {
            username: username.value,
            password: password.value
        })
        console.log(data);
        Toast.success('注册成功');
        T.value = 'login'
    }
}
```

## 作者留言
- 有需要改进的地方可以联系作者 wx：17879328848
- 支持一下作者，点点 github 的 star~
