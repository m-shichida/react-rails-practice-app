class CreateAccessTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :access_tokens do |t|
      t.references :user, null: false, foreign_key: true
      t.string :token,    null: false

      t.index ["user_id"], name: "index_request_tokens_on_user_id"
      t.timestamps
    end
  end
end
