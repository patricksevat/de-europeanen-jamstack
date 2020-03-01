import React, { FunctionComponent, useState, useEffect } from 'react'
import Layout from '../../components/Layout'


interface IContactProps {

}

const ContactPage: FunctionComponent<IContactProps> = (props) => {
  const params = (new URL(window.location.href)).searchParams;
  const [submitSuccess, setSubmitSuccess] = useState(params.get('success') === 'true');

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="content">
            { submitSuccess && (
              <div className="message is-success">
                <div className="message-header">
                  <p>Formulier verzonden</p>
                  <button
                    className="delete"
                    aria-label="verwijder notificatie"
                    onClick={() => setSubmitSuccess(false)}
                  ></button>
                </div>
                <div className="message-body">
                  Bedankt voor uw bericht!
                  <br/>We zullen spoedig reageren.
                </div>
              </div>
            )}
            <h1>Stuur ons een bericht</h1>
            <form
              name="contact"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="nep-naam"
              onSubmit={() => setSubmitSuccess(true)}
              action={'/contact?success=true'}
            >
              {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
              <input type="hidden" name="form-name" value="contact" />
              <div hidden>
                <label>
                  Niet invullen:
                  <input name="nep-naam" type={'text'} />
                </label>
              </div>
              <div className="field">
                <label className="label" htmlFor={'name'}>
                  Uw naam
                </label>
                <div className="control">
                  <input
                    className="input"
                    type={'text'}
                    name={'name'}
                    id={'name'}
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor={'email'}>
                  Uw emailadres
                </label>
                <div className="control">
                  <input
                    className="input"
                    type={'email'}
                    name={'email'}
                    id={'email'}
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor={'subject'}>
                  Onderwerp
                </label>
                <div className="control">
                  <input
                    className="input"
                    type={'subject'}
                    name={'subject'}
                    id={'subject'}
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor={'message'}>
                  Bericht
                </label>
                <div className="control">
                    <textarea
                      className="textarea"
                      name={'message'}
                      id={'message'}
                      required={true}
                    />
                </div>
              </div>
              <div className="field">
                <button className="button is-link" type="submit">
                  Verstuur
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ContactPage;
