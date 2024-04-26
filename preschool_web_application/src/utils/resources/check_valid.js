const REGEX_NAME =/[A-Za-z\W]+$/;

function nameStudentValid(text)
{
    if(text.trim() === '')
        return '*Không được bỏ trống'
    if(!REGEX_NAME.exec(text.trim()))
        return '*Không được có chữ số hoặc ký tự đặc biệt'
    return ''
}
function birthdayStudentValid(date)
{
    const birthday = new Date(date)

    const now = new Date()
    if(now < birthday)
        return '*Ngày sinh không hợp lệ!'
    return ''
}

export { nameStudentValid ,birthdayStudentValid};