require 'test_helper'

class CarTrimsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:car_trims)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create car_trim" do
    assert_difference('CarTrim.count') do
      post :create, :car_trim => { }
    end

    assert_redirected_to car_trim_path(assigns(:car_trim))
  end

  test "should show car_trim" do
    get :show, :id => car_trims(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => car_trims(:one).to_param
    assert_response :success
  end

  test "should update car_trim" do
    put :update, :id => car_trims(:one).to_param, :car_trim => { }
    assert_redirected_to car_trim_path(assigns(:car_trim))
  end

  test "should destroy car_trim" do
    assert_difference('CarTrim.count', -1) do
      delete :destroy, :id => car_trims(:one).to_param
    end

    assert_redirected_to car_trims_path
  end
end
