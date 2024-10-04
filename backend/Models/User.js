//a model for user registration and login

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailOrPhone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
// Compare this snippet from Frontend/src/Pages/Registration.jsx:
//             onChange={handleChange}
//           />
//           <button type="submit">Register</button>
//         </form>
//         <div className="login-link">
//           <p>Already have an account? <a href="/login">Login</a></p>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default RegistrationPage;
// Compare this snippet from Frontend/src/store.js:
// import { createStore } from 'redux';
// import rootReducer from './reducers';
//
// const store = createStore(rootReducer);
//
// export default store;
// Compare this snippet from Frontend/src/reducers/index.js: