export default function Profile({ user }) {
    return (
        <div>
            {user &&
                <>
                    <div>{user.userName}</div>
                </>
            }
        </div>
    )
}
