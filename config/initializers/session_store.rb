# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_midterm_session',
  :secret      => '926b62aecfb443b656c2fd0269cf20439206003c1dba2e8524f1f8c7148111f247d609f9f89f427dd4130ddb13c867a608f5116d3e0f6d9f736213183a8a2ff3'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
