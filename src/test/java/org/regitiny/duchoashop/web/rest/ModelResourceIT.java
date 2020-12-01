package org.regitiny.duchoashop.web.rest;

import org.regitiny.duchoashop.RedisTestContainerExtension;
import org.regitiny.duchoashop.DucHoaShopApp;
import org.regitiny.duchoashop.domain.Model;
import org.regitiny.duchoashop.repository.ModelRepository;
import org.regitiny.duchoashop.repository.search.ModelSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ModelResource} REST controller.
 */
@SpringBootTest(classes = DucHoaShopApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class ModelResourceIT {

    private static final String DEFAULT_MODAL = "AAAAAAAAAA";
    private static final String UPDATED_MODAL = "BBBBBBBBBB";

    @Autowired
    private ModelRepository modelRepository;

    /**
     * This repository is mocked in the org.regitiny.duchoashop.repository.search test package.
     *
     * @see org.regitiny.duchoashop.repository.search.ModelSearchRepositoryMockConfiguration
     */
    @Autowired
    private ModelSearchRepository mockModelSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restModelMockMvc;

    private Model model;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Model createEntity(EntityManager em) {
        Model model = new Model()
            .modal(DEFAULT_MODAL);
        return model;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Model createUpdatedEntity(EntityManager em) {
        Model model = new Model()
            .modal(UPDATED_MODAL);
        return model;
    }

    @BeforeEach
    public void initTest() {
        model = createEntity(em);
    }

    @Test
    @Transactional
    public void createModel() throws Exception {
        int databaseSizeBeforeCreate = modelRepository.findAll().size();
        // Create the Model
        restModelMockMvc.perform(post("/api/models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(model)))
            .andExpect(status().isCreated());

        // Validate the Model in the database
        List<Model> modelList = modelRepository.findAll();
        assertThat(modelList).hasSize(databaseSizeBeforeCreate + 1);
        Model testModel = modelList.get(modelList.size() - 1);
        assertThat(testModel.getModal()).isEqualTo(DEFAULT_MODAL);

        // Validate the Model in Elasticsearch
        verify(mockModelSearchRepository, times(1)).save(testModel);
    }

    @Test
    @Transactional
    public void createModelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = modelRepository.findAll().size();

        // Create the Model with an existing ID
        model.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModelMockMvc.perform(post("/api/models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(model)))
            .andExpect(status().isBadRequest());

        // Validate the Model in the database
        List<Model> modelList = modelRepository.findAll();
        assertThat(modelList).hasSize(databaseSizeBeforeCreate);

        // Validate the Model in Elasticsearch
        verify(mockModelSearchRepository, times(0)).save(model);
    }


    @Test
    @Transactional
    public void getAllModels() throws Exception {
        // Initialize the database
        modelRepository.saveAndFlush(model);

        // Get all the modelList
        restModelMockMvc.perform(get("/api/models?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(model.getId().intValue())))
            .andExpect(jsonPath("$.[*].modal").value(hasItem(DEFAULT_MODAL)));
    }
    
    @Test
    @Transactional
    public void getModel() throws Exception {
        // Initialize the database
        modelRepository.saveAndFlush(model);

        // Get the model
        restModelMockMvc.perform(get("/api/models/{id}", model.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(model.getId().intValue()))
            .andExpect(jsonPath("$.modal").value(DEFAULT_MODAL));
    }
    @Test
    @Transactional
    public void getNonExistingModel() throws Exception {
        // Get the model
        restModelMockMvc.perform(get("/api/models/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModel() throws Exception {
        // Initialize the database
        modelRepository.saveAndFlush(model);

        int databaseSizeBeforeUpdate = modelRepository.findAll().size();

        // Update the model
        Model updatedModel = modelRepository.findById(model.getId()).get();
        // Disconnect from session so that the updates on updatedModel are not directly saved in db
        em.detach(updatedModel);
        updatedModel
            .modal(UPDATED_MODAL);

        restModelMockMvc.perform(put("/api/models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedModel)))
            .andExpect(status().isOk());

        // Validate the Model in the database
        List<Model> modelList = modelRepository.findAll();
        assertThat(modelList).hasSize(databaseSizeBeforeUpdate);
        Model testModel = modelList.get(modelList.size() - 1);
        assertThat(testModel.getModal()).isEqualTo(UPDATED_MODAL);

        // Validate the Model in Elasticsearch
        verify(mockModelSearchRepository, times(1)).save(testModel);
    }

    @Test
    @Transactional
    public void updateNonExistingModel() throws Exception {
        int databaseSizeBeforeUpdate = modelRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restModelMockMvc.perform(put("/api/models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(model)))
            .andExpect(status().isBadRequest());

        // Validate the Model in the database
        List<Model> modelList = modelRepository.findAll();
        assertThat(modelList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Model in Elasticsearch
        verify(mockModelSearchRepository, times(0)).save(model);
    }

    @Test
    @Transactional
    public void deleteModel() throws Exception {
        // Initialize the database
        modelRepository.saveAndFlush(model);

        int databaseSizeBeforeDelete = modelRepository.findAll().size();

        // Delete the model
        restModelMockMvc.perform(delete("/api/models/{id}", model.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Model> modelList = modelRepository.findAll();
        assertThat(modelList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Model in Elasticsearch
        verify(mockModelSearchRepository, times(1)).deleteById(model.getId());
    }

    @Test
    @Transactional
    public void searchModel() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        modelRepository.saveAndFlush(model);
        when(mockModelSearchRepository.search(queryStringQuery("id:" + model.getId())))
            .thenReturn(Collections.singletonList(model));

        // Search the model
        restModelMockMvc.perform(get("/api/_search/models?query=id:" + model.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(model.getId().intValue())))
            .andExpect(jsonPath("$.[*].modal").value(hasItem(DEFAULT_MODAL)));
    }
}
