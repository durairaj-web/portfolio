const fullName = document.querySelector("#contact-name"),
    email = document.querySelector("#contact-email"),
    phone = document.querySelector("#contact-phone"),
    subject = document.querySelector("#subject"),
    message = document.querySelector("#contact-message"),
    button = document.querySelector("#submit"),
    form = document.querySelector("#contact-form"),
    res_line = document.querySelector(".response-output"),
    GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdpuTbX85MjyzbPyZpe-UlRWc-BiHpK7twsFeUzWXopmWUKxQ/formResponse",
    handleSubmit = async e => {
        e.preventDefault();
        const t = fullName.value,
            o = email.value,
            p = phone.value,
            st = subject.value,
            a = message.value;
        let s = 0;
        if ("" == t ? (s = 1, fullName.classList.add("not-valid")) : fullName.classList.remove("not-valid"),
		"" == o ? (s = 1, email.classList.add("not-valid")) : "" == o || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o) ? email.classList.remove("not-valid") : (console.log("----"), s = 1, email.classList.add("not-valid")),
		"" == p ? (s = 1, phone.classList.add("not-valid")) : phone.classList.remove("not-valid"),
		"" == st ? (s = 1, subject.classList.add("not-valid")) : subject.classList.remove("not-valid"),
		"" == a ? (s = 1, message.classList.add("not-valid")) : message.classList.remove("not-valid"), s)
		return form.classList.remove("init"),
		form.classList.add("invalid"),
		res_line.textContent = "One or more fields have an error. Please check and try again.", !1;
        form.classList.remove("invalid"),
		form.classList.add("sent"),
		res_line.textContent = "Your request is processing.";
        const n = newFormData({
            ...{
                "entry.1403308977": t,
                "entry.1024269894": o,
                "entry.1024269894": p,
                "entry.1024269894": st,
                "entry.2087681545": a
            }
        });
        try {
            button.disabled = !0;
            await fetch(GOOGLE_FORM_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: n
            });
            clearFormData(),
			res_line.textContent = "Thank you for filling out your information! I'll get back in touch with you soon! Have a great day!", setTimeout((function() {
                form.classList.remove("sent"), form.classList.add("init"), res_line.textContent = ""
            }), 3e3)
        } catch (e) {
            res_line.textContent = "Something went wrong, please try again.", console.log(e)
        } finally {
            button.disabled = !1
        }
    };
form.addEventListener("submit", handleSubmit);
const newFormData = e => {
    const t = new FormData;
    return Object.entries(e).map((e => t.append(`${e[0]}`, e[1]))), t
};

function clearFormData() {
    form.querySelectorAll("input, textarea").forEach((e => {
        "submit" !== e.type && "button" !== e.type && (e.value = "")
    }))
}