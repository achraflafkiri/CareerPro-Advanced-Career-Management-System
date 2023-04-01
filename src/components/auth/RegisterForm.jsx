import React from 'react'

const RegisterForm = () => {
  return (
    <form class="p-2">
    <div className="mb-3">
        <label htmlFor="E-mail">username</label>
        <input type="text" name="email" id="email" class="form-control" />
    </div>
    <div className="mb-3">
        <label htmlFor="E-mail">email</label>
        <input type="text" name="email" id="email" class="form-control" />
        <small className="text-dark">We'll never share your email with anyone else.</small>
    </div>
    <div className="mb-3">
        <label htmlFor="Password">password</label>
        <input type="text" name="password" id="password" class="form-control" />
    </div>
    <div className="mb-3">
        <label htmlFor="Password2">confirm password</label>
        <input type="text" name="password2" id="password" class="form-control" />
    </div>
    <div className="mb-3">
        <input type="submit" value="send" class="btn btn-primary btn-ms"/>
    </div>
</form>
  )
}

export default RegisterForm
