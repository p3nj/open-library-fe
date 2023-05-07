import React, {useState} from 'react';


export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '5rem auto'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '20px',
        },
        label: {
            marginBottom: '10px',
            fontWeight: 'bold',
        },
        input: {
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '100%',
        },
        button: {
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Email: ${email}`);
    };

    return (
        <div style={styles.container}>
            <h1>Forgot Password</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                <label style={styles.label}>Email:</label>
                <input
                    style={styles.input}
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <button style={styles.button} type="submit">
                    Reset Password
                </button>
            </form>
        </div>
    );
}
