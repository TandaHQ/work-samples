# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  create_table "addon_rule_configs", force: :cascade do |t|
    t.integer "addon_rule_id", null: false
    t.float "units", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index "\"hours_rule_id\"", name: "index_addon_rule_configs_on_hours_rule_id"
  end

  create_table "day_of_week_test_configs", force: :cascade do |t|
    t.integer "day_of_week_test_id", null: false
    t.integer "wday", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index "\"earning_rule_id\"", name: "index_day_of_week_test_configs_on_day_of_week_test_id"
  end

  create_table "earning_rules", force: :cascade do |t|
    t.text "code", null: false
    t.text "type", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "earning_tests", force: :cascade do |t|
    t.integer "earning_rule_id", null: false
    t.text "type", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["earning_rule_id"], name: "index_earning_tests_on_earning_rule_id"
  end

  create_table "earnings", force: :cascade do |t|
    t.integer "earning_rule_id", null: false
    t.integer "shift_id", null: false
    t.float "units", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["earning_rule_id"], name: "index_earnings_on_earning_rule_id"
    t.index ["shift_id"], name: "index_shift_earning_records_on_shift_id"
  end

  create_table "hours_rule_configs", force: :cascade do |t|
    t.integer "hours_rule_id", null: false
    t.float "rank", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["hours_rule_id"], name: "index_hours_rule_configs_on_hours_rule_id"
  end

  create_table "maximum_hours_test_configs", force: :cascade do |t|
    t.integer "maximum_hours_test_id", null: false
    t.text "period", null: false
    t.float "threshold", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index "\"earning_rule_id\"", name: "index_maximum_hours_test_configs_on_maximum_hours_test_id"
  end

  create_table "shifts", force: :cascade do |t|
    t.datetime "start", precision: 6, null: false
    t.datetime "finish", precision: 6, null: false
    t.integer "timesheet_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["timesheet_id"], name: "index_shifts_on_timesheet_id"
  end

  create_table "timesheets", force: :cascade do |t|
    t.date "start", null: false
    t.date "finish", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
