import React from 'react'

const PostLoading = () => {
    return (
        <div style={styles.PostLoading}>
            <h4 style={styles.heading}>Please wait while we are fetching more post...</h4>
            <div className="Anim" style={styles.Anim}></div>
        </div>
    )
};

const styles = {
    PostLoading: {
        height: '95px',
        width: '98%',
        maxWidth: '500px',
        boxShadow: '1 2 10px rgba(0,0,0,0.1), 1 3 10px rgba(0,0,0,0.06)',
        borderRadius: '15px',
        backGround: 'white',
        margin: '0px auto 80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    heading: {
        fontFamily: 'Arial',
        fontWeight: '300',
        paddingTop: '10px'
    },
    Anim: {
        marginTop: '10px'
    }
}

export default PostLoading;
