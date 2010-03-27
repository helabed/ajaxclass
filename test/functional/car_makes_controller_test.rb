require 'test_helper'

class CarMakesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:car_makes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create car_make" do
    assert_difference('CarMake.count') do
      post :create, :car_make => { }
    end

    assert_redirected_to car_make_path(assigns(:car_make))
  end

  test "should show car_make" do
    get :show, :id => car_makes(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => car_makes(:one).to_param
    assert_response :success
  end

  test "should update car_make" do
    put :update, :id => car_makes(:one).to_param, :car_make => { }
    assert_redirected_to car_make_path(assigns(:car_make))
  end

  test "should destroy car_make" do
    assert_difference('CarMake.count', -1) do
      delete :destroy, :id => car_makes(:one).to_param
    end

    assert_redirected_to car_makes_path
  end
end
