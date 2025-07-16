import React from 'react'
import useAuth from '../hook/useAuth'

const Root = () => {

    const { user } = useAuth()
    return (
        <div>
            <main className="flex-1 p-6 lg:p-10">
                <section className="mb-10">
                    <h1 className="text-4xl font-extrabold text-blue-500 mb-2">
                        Welcome to your Dashboard!
                    </h1>
                    <p className="text-lg my-3 text-gray-700">
                        Hi <span className="font-semibold text-blue-600">{user?.displayName || "User"}</span>, glad to see you here.
                    </p>
                    <p className="mt-2 text-gray-500 max-w-xl">
                        Manage your profile, classes, bookings, and more from this panel. Navigate through the sidebar to explore the available options.
                    </p>
                </section>
            </main>
        </div>
    )
}

export default Root